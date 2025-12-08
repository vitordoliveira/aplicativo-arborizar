import { useAuth } from "../hooks/useAuth.ts";
import styled from "styled-components";
import ProgressBar from "../components/ProgressBar.tsx";
import { IoLeafOutline, IoMedal, IoTrophy, IoAdd } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiIdentity } from "../services/api.ts";

const PageContainer = styled.div`
  padding: 24px 16px 100px 16px;
  background-color: #f9f9f9;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;
const WelcomeText = styled.div`
  h1 {
    font-size: 24px;
    font-weight: bold;
    color: #333;
    margin: 0;
  }
  p {
    font-size: 16px;
    color: #777;
    margin: 0;
  }
`;
const Avatar = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: #6a8b49;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  border: none;
  cursor: pointer;
`;
const ProgressoCard = styled.div`
  background-color: #ffffff;
  border-radius: 20px;
  padding: 20px;
  margin-bottom: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;
const ProgressoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  h2 {
    font-size: 16px;
    color: #555;
    margin: 0;
  }
  span {
    font-size: 12px;
    font-weight: bold;
    color: #007bff;
    background-color: #e0f7ff;
    padding: 4px 8px;
    border-radius: 8px;
  }
`;
const ProgressoXP = styled.div`
  margin-bottom: 16px;
  p {
    font-size: 14px;
    color: #777;
    margin: 4px 0;
    text-align: right;
  }
`;
const ProgressoStats = styled.div`
  display: flex;
  justify-content: space-around;
  text-align: center;
`;
const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #555;
  font-size: 14px;
  svg {
    font-size: 32px;
    color: #6a8b49;
    margin-bottom: 8px;
  }
  span {
    font-size: 18px;
    font-weight: bold;
    color: #333;
  }
`;
const ClickableStatItem = styled(StatItem)`
  cursor: pointer;
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.05);
  }
`;
const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin-bottom: 16px;
`;
const ConquistaCard = styled.div`
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
`;
const ConquistaIcon = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 22.5px;
  background-color: #e8f5e9;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: #6a8b49;
  margin-right: 16px;
`;
const ConquistaInfo = styled.div`
  h3 {
    font-size: 16px;
    font-weight: bold;
    color: #333;
  }
  p {
    font-size: 14px;
    color: #777;
  }
`;
const LogoutButton = styled.button`
  background: none;
  border: 1px solid #d9534f;
  color: #d9534f;
  padding: 10px 16px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 30px;
  &:hover {
    background: #d9534f;
    color: white;
  }
`;

const FloatingActionButton = styled.button`
  position: fixed;
  bottom: 100px;
  right: 20px;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: #ff8c00;
  color: white;
  border: none;
  font-size: 36px;
  display: flex;
  align-items: center; // 2. Alinha o ícone
  justify-content: center; // 3. Centraliza o ícone
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  z-index: 1000;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

interface UsuarioData {
  id_usuario: number;
  nome: string;
  email: string;
  tipo: string;
  pontos_totais: number;
  xp_total: number;
}
interface StatsData {
  arvoresPlantadas: number;
  medalhas: number;
  ranking: string;
}

export default function HomePage() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<UsuarioData | null>(null);
  const [statsData, setStatsData] = useState<StatsData | null>(null);

  useEffect(() => {
    async function carregarDashboard() {
      try {
        const response = await apiIdentity.get<{
          usuario: UsuarioData;
          stats: StatsData;
        }>("/auth/me/dashboard");

        setUserData(response.data.usuario);
        setStatsData(response.data.stats);
      } catch (error) {
        console.error("Erro ao buscar dados do dashboard:", error);
      } finally {
        setIsLoading(false);
      }
    }
    carregarDashboard();
  }, []);

  const nome = userData?.nome || "Guardião";
  const avatar = nome[0].toUpperCase() || "G";
  const nivel = 5;
  const titulo = "Protetor da Restinga";
  const xp_atual = userData?.xp_total || 0;
  const xp_total = 1000;
  const xpPercentual = (xp_atual / xp_total) * 100;
  const arvoresPlantadas = statsData?.arvoresPlantadas ?? 0;
  const medalhas = statsData?.medalhas ?? 0;
  const ranking = statsData?.ranking ?? "...";

  if (isLoading) {
    return (
      <PageContainer>
        <p>{"Carregando dados do guardião..."}</p>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Header>
        <WelcomeText>
          <h1>{`Olá, ${nome}!`}</h1>
          <p>{"Bem-vindo de volta, Guardião!"}</p>
        </WelcomeText>
        <Avatar onClick={() => navigate("/perfil")}>{avatar}</Avatar>
      </Header>

      <ProgressoCard>
        <ProgressoHeader>
          <h2>{"Seu Progresso de Guardião"}</h2>
          <span>{`Nível ${nivel}`}</span>
        </ProgressoHeader>
        <p>{titulo}</p>
        <ProgressoXP>
          <ProgressBar progress={xpPercentual} />
          <p>{`${xp_atual} / ${xp_total} XP`}</p>
        </ProgressoXP>
        <ProgressoStats>
          <StatItem>
            <IoLeafOutline />
            <span>{arvoresPlantadas}</span>
            {"Árvores Plantadas"}
          </StatItem>
          <StatItem>
            <IoMedal />
            <span>{medalhas}</span>
            {"Medalhas"}
          </StatItem>
          <ClickableStatItem onClick={() => navigate("/ranking")}>
            <IoTrophy />
            <span>{ranking}</span>
            {"No Ranking"}
          </ClickableStatItem>
        </ProgressoStats>
      </ProgressoCard>

      <SectionTitle>{"⭐ Conquistas Recentes"}</SectionTitle>

      <ConquistaCard>
        <ConquistaIcon>{"🌸"}</ConquistaIcon>
        <ConquistaInfo>
          <h3>{"Primeira Florada"}</h3>
          <p>{"Plantou seu primeiro Ipê-Amarelo"}</p>
        </ConquistaInfo>
      </ConquistaCard>
      <ConquistaCard>
        <ConquistaIcon>{"🌳"}</ConquistaIcon>
        <ConquistaInfo>
          <h3>{"Guardião Dedicado"}</h3>
          <p>{"3 árvores plantadas!"}</p>
        </ConquistaInfo>
      </ConquistaCard>

      <LogoutButton onClick={logout}>{"Sair (Logout)"}</LogoutButton>

      <FloatingActionButton onClick={() => navigate("/novo-plantio")}>
        <IoAdd />
      </FloatingActionButton>
    </PageContainer>
  );
}
