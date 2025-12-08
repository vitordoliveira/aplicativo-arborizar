import { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import {
  IoArrowBack,
  IoCamera,
  IoImages,
  IoCheckmarkCircle,
  IoLocationSharp,
  IoBulb,
} from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../components/ProgressBar.tsx";
import { apiGeo } from "../services/api.ts";

interface Especie {
  id_especie: number;
  nome_popular: string;
  nome_cientifico: string;
  descricao: string;
  pontos_recompensa: number;
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f4f7f6;
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 16px;
  background-color: #fff;
  gap: 16px;

  h2 {
    font-size: 16px;
    font-weight: bold;
    color: #333;
    margin: 0;
  }
`;
const ProgressContainer = styled.div`
  padding: 16px;
  background: #fff;
  p {
    font-size: 12px;
    color: #777;
    margin-bottom: 8px;
  }
`;
const Content = styled.div`
  flex: 1;
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
`;
const UploadBox = styled.div<{ $hasImage: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border: 2px dashed ${(props) => (props.$hasImage ? "#6a8b49" : "#e0e0e0")};
  border-radius: 20px;
  padding: 20px;
  color: ${(props) => (props.$hasImage ? "#6a8b49" : "#ccc")};

  svg {
    font-size: 60px;
    margin-bottom: 16px;
  }
`;
const UploadImagePreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 16px;
`;
const Button = styled.button<{ $primary?: boolean; $secondary?: boolean }>`
  width: 100%;
  padding: 16px;
  margin-top: 16px;
  border-radius: 12px;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  background-color: ${(props) => (props.$primary ? "#6a8b49" : "#fff")};
  color: ${(props) => (props.$primary ? "#fff" : "#6a8b49")};
  border: 1px solid ${(props) => (props.$primary ? "#6a8b49" : "#e0e0e0")};

  ${(props) =>
    props.$secondary &&
    css`
      background-color: #fff;
      color: #555;
      border: 1px solid #ccc;
      margin-top: 8px;
    `}
`;
const TipCard = styled.div<{ $type: "dica" | "info" }>`
  background-color: ${(props) =>
    props.$type === "dica" ? "#FFF3E0" : "#E0F7FF"};
  border: 1px solid
    ${(props) => (props.$type === "dica" ? "#FFD180" : "#B3E5FC")};
  color: ${(props) => (props.$type === "dica" ? "#8D6E63" : "#01579B")};
  border-radius: 12px;
  padding: 16px;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  font-size: 14px;
  line-height: 1.5;
  margin-top: 24px;

  svg {
    font-size: 20px;
    margin-top: 2px;
    flex-shrink: 0;
  }
`;
const SpeciesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
const SpeciesCard = styled.div<{ $isSelected: boolean }>`
  background-color: #fff;
  border: 2px solid ${(props) => (props.$isSelected ? "#6a8b49" : "#f0f0f0")};
  border-radius: 16px;
  padding: 16px;
  display: flex;
  align-items: center;
  cursor: pointer;
  box-shadow: ${(props) =>
    props.$isSelected ? "0 4px 12px rgba(0, 0, 0, 0.1)" : "none"};
  transition: all 0.2s;
`;
const SpeciesIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 12px;
  background-color: #e8f5e9;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: #6a8b49;
  margin-right: 16px;
`;
const SpeciesInfo = styled.div`
  h3 {
    font-size: 16px;
    font-weight: bold;
    color: #333;
    margin: 0;
  }
  p {
    font-size: 12px;
    color: #777;
    margin: 0;
  }
`;
const FooterButton = styled(Button)`
  margin-top: auto;
`;

export default function NovoPlantioPage() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [image, setImage] = useState<string | null>(null);
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(
    null
  );
  const [speciesList, setSpeciesList] = useState<Especie[]>([]);
  const [selectedSpeciesId, setSelectedSpeciesId] = useState<number | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (err) => {
        console.warn("Erro ao pegar GPS:", err.message);
        setLocation({ lat: -23.623, lon: -45.413 });
      }
    );
  }, []);

  useEffect(() => {
    if (step === 2) {
      async function carregarEspecies() {
        try {
          const response = await apiGeo.get("/especies");
          const especiesComPontos = response.data.map((esp: Especie) => ({
            ...esp,
            pontos_recompensa: Math.floor(Math.random() * 100) + 150,
          }));
          setSpeciesList(especiesComPontos);
        } catch (error) {
          console.error("Erro ao buscar espécies:", error);
        }
      }
      carregarEspecies();
    }
  }, [step]);

  const handleSimulatePhoto = () => {
    setImage("https://i.imgur.com/K81mIQP.jpeg");
    setStep(2);
  };

  const handleSubmit = async () => {
    if (!image || !selectedSpeciesId || !location) {
      alert("Por favor, complete todos os passos.");
      return;
    }

    setIsLoading(true);

    try {
      await apiGeo.post("/plantios", {
        foto_url: image,
        latitude: location.lat,
        longitude: location.lon,
        id_especie: selectedSpeciesId,
      });

      alert("Árvore registrada com sucesso! Você ganhou pontos!");
      navigate("/inicio");
    } catch (error) {
      console.error("Erro ao registrar plantio:", error);
      alert("Erro ao registrar plantio. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageContainer>
      <Header>
        <IoArrowBack
          size={24}
          style={{ cursor: "pointer" }}
          onClick={() => (step === 1 ? navigate(-1) : setStep(1))}
        />
        <h2>{`Passo ${step} de 2`}</h2>
      </Header>

      <ProgressContainer>
        <p>{"Progresso"}</p>
        <ProgressBar progress={step === 1 ? 50 : 100} />
      </ProgressContainer>

      {step === 1 && (
        <Content>
          <UploadBox $hasImage={!!image}>
            {image ? (
              <UploadImagePreview src={image} alt="Prévia" />
            ) : (
              <>
                <IoCamera />
                <p>{"Tire uma foto ou escolha da galeria"}</p>
              </>
            )}
          </UploadBox>

          {image ? (
            <>
              <Button $primary onClick={() => setStep(2)}>
                <IoCheckmarkCircle /> {"Próximo Passo"}
              </Button>
              <Button $secondary onClick={() => setImage(null)}>
                <IoCamera /> {"Tirar outra foto"}
              </Button>
            </>
          ) : (
            <>
              <Button $primary onClick={handleSimulatePhoto}>
                <IoCamera /> {"Tirar uma Foto"}
              </Button>
              <Button onClick={handleSimulatePhoto}>
                <IoImages /> {"Ou escolha da galeria"}
              </Button>
            </>
          )}

          <TipCard $type="dica">
            <IoBulb />
            {
              "Tente enquadrar a muda inteira na foto! Isso nos ajuda a acompanhar o crescimento da sua árvore ao longo do tempo."
            }
          </TipCard>
          <TipCard $type="info">
            <IoLocationSharp />
            {location
              ? "GPS ativo! A localização será registrada automaticamente."
              : "Ativando GPS..."}
          </TipCard>
        </Content>
      )}

      {step === 2 && (
        <Content>
          <SpeciesList>
            {speciesList.length === 0 && <p>{"Carregando espécies..."}</p>}
            {speciesList.map((especie) => (
              <SpeciesCard
                key={especie.id_especie}
                $isSelected={selectedSpeciesId === especie.id_especie}
                onClick={() => setSelectedSpeciesId(especie.id_especie)}
              >
                <SpeciesIcon>{"🌳"}</SpeciesIcon>
                <SpeciesInfo>
                  <h3>{especie.nome_popular}</h3>
                  <p>{`+${especie.pontos_recompensa} Pontos`}</p>
                </SpeciesInfo>
              </SpeciesCard>
            ))}
          </SpeciesList>

          <FooterButton
            $primary
            onClick={handleSubmit}
            disabled={!selectedSpeciesId || isLoading}
          >
            {isLoading ? "Registrando..." : "Finalizar Plantio"}
          </FooterButton>
        </Content>
      )}
    </PageContainer>
  );
}
