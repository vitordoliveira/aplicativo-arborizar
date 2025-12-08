import { useState, useEffect } from "react";
import styled from "styled-components";
import { apiIdentity } from "../services/api.ts";
import {
  IoArrowBack,
  IoGlobeOutline,
  IoLocationOutline,
  IoRibbonOutline,
  IoArrowUp,
} from "react-icons/io5";

interface RankingUsuario {
  id_usuario: number;
  nome: string;
  avatar: string;
  pontos: number;
  titulo: string;
  arvores: number;
}
interface UsuarioData {
  nome: string;
  pontos_totais: number;
}
interface PosicaoData {
  posicao: number;
}

const PageContainer = styled.div`
  padding: 0 0 100px 0;
  background-color: #f4f7f6;
  min-height: calc(100vh - 80px);
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 16px;
  background-color: #fff;
`;
const HeaderTitle = styled.h1`
  font-size: 18px;
  font-weight: bold;
  color: #333;
`;
const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;
const PontosBadge = styled.div`
  background-color: #fff3e0;
  color: #ff8c00;
  font-weight: bold;
  font-size: 14px;
  padding: 6px 12px;
  border-radius: 16px;
`;
const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: #6a8b49;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
`;
const TabContainer = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 0 16px;
  background-color: #fff;
  border-bottom: 1px solid #f0f0f0;
`;
const Tab = styled.button<{ $active?: boolean }>`
  padding: 16px 8px;
  font-size: 14px;
  font-weight: bold;
  background: none;
  border: none;
  cursor: pointer;
  color: ${(props) => (props.$active ? "#6A8B49" : "#999")};
  border-bottom: 3px solid
    ${(props) => (props.$active ? "#6A8B49" : "transparent")};
  display: flex;
  align-items: center;
  gap: 6px;
`;
const YourPositionCard = styled.div`
  background-color: #fff;
  margin: 16px;
  padding: 16px;
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;
const Rank = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #333;
`;
const Points = styled.div`
  font-size: 14px;
  color: #555;
`;
const RankChange = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #4caf50;
  display: flex;
  align-items: center;
  gap: 4px;
`;
const Top3Container = styled.div`
  display: flex;
  gap: 12px;
  padding: 0 16px;
  overflow-x: auto;
`;
const Top3Card = styled.div<{ $rank: number }>`
  min-width: 150px;
  background-color: #fff;
  border-radius: 16px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border: 2px solid ${(props) => (props.$rank === 1 ? "#FFD700" : "#f0f0f0")};
`;
const Top3Avatar = styled(Avatar)`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  font-size: 28px;
  margin: 0 auto 12px auto;
`;
const Top3Name = styled.h3`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  white-space: nowrap;
`;
const Top3Points = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: #6a8b49;
  margin: 4px 0;
`;
const Top3Info = styled.p`
  font-size: 12px;
  color: #777;
  margin: 0;
`;
const ListContainer = styled.div`
  padding: 16px;
`;
const ListItem = styled.div`
  display: flex;
  align-items: center;
  background-color: #fff;
  padding: 12px 16px;
  border-radius: 12px;
  margin-bottom: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.03);
`;
const ListRank = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: #555;
  width: 40px;
`;
const ListAvatar = styled(Avatar)`
  width: 45px;
  height: 45px;
  font-size: 20px;
  margin-right: 12px;
`;
const ListInfo = styled.div`
  flex: 1;
  h4 {
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
const ListPoints = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: #6a8b49;
`;

export default function RankingPage() {
  const [activeTab, setActiveTab] = useState("global");
  const [userData, setUserData] = useState<UsuarioData | null>(null);

  const [ranking, setRanking] = useState<RankingUsuario[]>([]);
  const [minhaPosicao, setMinhaPosicao] = useState<PosicaoData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function carregarDados() {
      setIsLoading(true);
      try {
        const [userResponse, posicaoResponse] = await Promise.all([
          apiIdentity.get<UsuarioData>("/usuarios/me"),
          apiIdentity.get<PosicaoData>("/usuarios/me/posicao"),
        ]);

        setUserData(userResponse.data);
        setMinhaPosicao(posicaoResponse.data);
      } catch (error) {
        console.error("Erro ao buscar perfil ou posição:", error);
      }
    }
    carregarDados();
  }, []);

  // Busca o ranking global
  useEffect(() => {
    async function carregarRanking() {
      if (activeTab === "global") {
        setIsLoading(true);
        try {
          const response = await apiIdentity.get<RankingUsuario[]>(
            "/usuarios/ranking/global"
          );
          setRanking(response.data);
        } catch (error) {
          console.error("Erro ao buscar ranking global:", error);
        } finally {
          setIsLoading(false);
        }
      }
    }
    carregarRanking();
  }, [activeTab]);

  // Lógica para exibir os dados
  const top3 = ranking.slice(0, 3);
  const restOfRanking = ranking.slice(3);

  return (
    <PageContainer>
      <Header>
        <IoArrowBack size={24} style={{ cursor: "pointer" }} />
        <HeaderTitle>{"Ranking dos Guardiões"}</HeaderTitle>
        <HeaderRight>
          <PontosBadge>{userData?.pontos_totais || "..."}</PontosBadge>
          <Avatar>
            {userData?.nome ? userData.nome[0].toUpperCase() : "?"}
          </Avatar>
        </HeaderRight>
      </Header>

      <TabContainer>
        {/* ... (Abas) ... */}
        <Tab
          $active={activeTab === "global"}
          onClick={() => setActiveTab("global")}
        >
          <IoGlobeOutline /> {"Global"}
        </Tab>
        <Tab
          $active={activeTab === "caragua"}
          onClick={() => setActiveTab("caragua")}
        >
          <IoLocationOutline /> {"Caraguá"}
        </Tab>
        <Tab
          $active={activeTab === "conquistas"}
          onClick={() => setActiveTab("conquistas")}
        >
          <IoRibbonOutline /> {"Conquistas"}
        </Tab>
      </TabContainer>

      {activeTab === "global" && (
        <>
          <YourPositionCard>
            <div>
              <Rank>{`#${minhaPosicao?.posicao || "?"}`}</Rank>
              <Points>{`${userData?.pontos_totais || 0} pontos`}</Points>
            </div>
            <RankChange>
              <IoArrowUp /> {"+0 esta semana"}
            </RankChange>
          </YourPositionCard>

          {isLoading && (
            <ListContainer>
              <p>Carregando ranking...</p>
            </ListContainer>
          )}

          {!isLoading && (
            <>
              <Top3Container>
                {top3.map((user, index) => (
                  <Top3Card key={user.id_usuario} $rank={index + 1}>
                    <Top3Avatar>{user.avatar}</Top3Avatar>
                    <Top3Name>{user.nome}</Top3Name>
                    <Top3Info>{user.titulo}</Top3Info>
                    <Top3Points>{user.pontos}</Top3Points>
                    <Top3Info>{`${user.arvores} árvores`}</Top3Info>
                  </Top3Card>
                ))}
              </Top3Container>

              <ListContainer>
                {restOfRanking.map((user, index) => (
                  <ListItem key={user.id_usuario}>
                    <ListRank>{`#${index + 4}`}</ListRank>
                    <ListAvatar>{user.avatar}</ListAvatar>
                    <ListInfo>
                      <h4>{user.nome}</h4>
                      <p>{user.titulo}</p>
                    </ListInfo>
                    <ListPoints>{user.pontos}</ListPoints>
                  </ListItem>
                ))}
              </ListContainer>
            </>
          )}
        </>
      )}

      {activeTab === "caragua" && (
        <ListContainer>
          <p>{"Ranking de Caraguá em breve..."}</p>
        </ListContainer>
      )}
      {activeTab === "conquistas" && (
        <ListContainer>
          <p>{"Ranking de Conquistas em breve..."}</p>
        </ListContainer>
      )}
    </PageContainer>
  );
}
