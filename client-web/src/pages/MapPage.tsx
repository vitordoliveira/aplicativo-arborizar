import { useState, useEffect } from "react";
import styled from "styled-components";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
} from "react-leaflet";
import { apiGeo } from "../services/api.ts";
import { IoFilter, IoArrowBack } from "react-icons/io5";

const PageContainer = styled.div`
  height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
`;
const Header = styled.div`
  padding: 20px 16px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f0f0f0;
`;
const Title = styled.h1`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin: 0;
`;
const HeaderIcon = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  color: #666;
  cursor: pointer;
`;
const StatsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 16px;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  z-index: 10;
`;
const StatCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #555;
`;
const StatNumber = styled.span`
  font-size: 20px;
  font-weight: bold;
  color: #6a8b49;
`;
const StatLabel = styled.span`
  font-size: 12px;
  color: #777;
`;
const MapWrapper = styled.div`
  flex: 1;
  .leaflet-container {
    width: 100%;
    height: 100%;
  }
`;
const LegendaContainer = styled.div`
  position: absolute;
  top: 140px;
  left: 16px;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 12px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  font-size: 12px;
`;
const LegendaItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 6px;
`;
const LegendaCor = styled.div<{ $color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${(props) => props.$color};
  border: 1px solid #ccc;
  margin-right: 8px;
`;
const StyledPopup = styled(Popup)`
  .leaflet-popup-content-wrapper {
    border-radius: 10px;
    padding: 0;
    overflow: hidden;
  }
  .leaflet-popup-content {
    margin: 0;
    width: 150px;
  }
`;
const PopupImage = styled.img`
  width: 100%;
  height: 100px;
  object-fit: cover;
  /* Esconde a imagem se ela quebrar */
  &.is-broken {
    display: none;
  }
`;
const PopupContent = styled.div`
  padding: 12px;
`;
const PopupTitle = styled.h4`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin: 0 0 8px 0;
`;
const PopupText = styled.p`
  font-size: 12px;
  color: #666;
  margin: 0;
`;

interface Especie {
  nome_popular: string;
}
interface Plantio {
  id_plantio: number;
  latitude: number;
  longitude: number;
  foto_url: string;
  especie: Especie;
}
interface PlantioApiDTO {
  id_plantio: number;
  latitude: string;
  longitude: string;
  foto_url: string;
  especie: Especie;
}

export default function MapPage() {
  const [plantios, setPlantios] = useState<Plantio[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({ arvores: 0, zonas: 2, minhas: 5 });
  const initialPosition: [number, number] = [-23.623, -45.413];

  useEffect(() => {
    async function carregarDadosDoMapa() {
      setIsLoading(true);
      try {
        const responsePlantios = await apiGeo.get<PlantioApiDTO[]>("/plantios");
        const dadosConvertidos: Plantio[] = responsePlantios.data.map(
          (plantio) => ({
            ...plantio,
            latitude: parseFloat(plantio.latitude),
            longitude: parseFloat(plantio.longitude),
          })
        );
        setPlantios(dadosConvertidos);
        setStats((prevStats) => ({
          ...prevStats,
          arvores: dadosConvertidos.length,
        }));
      } catch (error) {
        console.error("Erro ao buscar dados do mapa:", error);
      } finally {
        setIsLoading(false);
      }
    }
    carregarDadosDoMapa();
  }, []);

  return (
    <PageContainer>
      <Header>
        <HeaderIcon>
          <IoArrowBack />
        </HeaderIcon>
        <Title>{"📍 Mapa dos Guardiões"}</Title>
        <HeaderIcon>
          <IoFilter />
        </HeaderIcon>
      </Header>

      <StatsContainer>
        <StatCard>
          <StatNumber>{isLoading ? "..." : stats.arvores}</StatNumber>
          <StatLabel>{"Árvores"}</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>{stats.zonas}</StatNumber>
          <StatLabel>{"Zonas Ativas"}</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>{stats.minhas}</StatNumber>
          <StatLabel>{"Minhas"}</StatLabel>
        </StatCard>
      </StatsContainer>

      <LegendaContainer>
        <LegendaItem>
          <LegendaCor $color="#4CAF50" /> {"Minhas árvores"}
        </LegendaItem>
        <LegendaItem>
          <LegendaCor $color="#2196F3" /> {"Árvores da escola"}
        </LegendaItem>
        <LegendaItem>
          <LegendaCor $color="#9E9E9E" /> {"Outras árvores"}
        </LegendaItem>
        <LegendaItem>
          <LegendaCor $color="#BDBDBD" /> {"Zona de plantio"}
        </LegendaItem>
      </LegendaContainer>

      <MapWrapper>
        {isLoading ? (
          <p>{"Carregando..."}</p>
        ) : (
          <MapContainer
            center={initialPosition}
            zoom={13}
            scrollWheelZoom={true}
            zoomControl={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <ZoomControl position="bottomright" />

            {plantios.map((plantio) => (
              <Marker
                key={plantio.id_plantio}
                position={[plantio.latitude, plantio.longitude]}
              >
                <StyledPopup>
                  <PopupImage
                    src={plantio.foto_url}
                    alt="Plantio"
                    onError={(e) => e.currentTarget.classList.add("is-broken")}
                  />
                  <PopupContent>
                    <PopupTitle>{plantio.especie.nome_popular}</PopupTitle>
                    <PopupText>
                      {`Coords: ${plantio.latitude.toFixed(
                        4
                      )}, ${plantio.longitude.toFixed(4)}`}
                    </PopupText>
                  </PopupContent>
                </StyledPopup>
              </Marker>
            ))}
          </MapContainer>
        )}
      </MapWrapper>
    </PageContainer>
  );
}
