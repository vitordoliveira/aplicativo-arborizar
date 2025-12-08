import { useState, useEffect } from "react";
import styled from "styled-components";
import { useAuth } from "../hooks/useAuth";
import { apiIdentity } from "../services/api";
import ProgressBar from "../components/ProgressBar";
import ToggleSwitch from "../components/ToggleSwitch";
import {
  IoArrowBack,
  IoLeaf,
  IoTrophy,
  IoFlame,
  IoTrailSign,
  IoBarChart,
  IoNotifications,
  IoLocation,
  IoCalendar,
  IoShareSocial,
  IoGift,
  IoHelpCircle,
  IoShieldCheckmark,
  IoLogOut,
  IoSettingsOutline,
} from "react-icons/io5";

interface UsuarioData {
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

const PageContainer = styled.div`
  padding: 0 0 100px 0; /* TabBar no final */
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

const ProfileCard = styled.div`
  background-color: #fff;
  margin: 16px;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;
const ProfileInfo = styled.div`
  text-align: center;
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 16px;
  margin-bottom: 16px;
`;
const ProfileAvatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  background-color: #6a8b49;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  font-weight: bold;
  margin: 0 auto 16px auto;
  position: relative;
`;
const ProfileName = styled.h2`
  font-size: 20px;
  font-weight: bold;
  color: #333;
`;
const ProfileBio = styled.p`
  font-size: 14px;
  color: #777;
  margin-top: 8px;
`;
const XPBarContainer = styled.div`
  p {
    font-size: 12px;
    color: #777;
    text-align: right;
    margin-top: 4px;
  }
`;
const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-top: 16px;
`;
const StatItem = styled.div`
  background-color: #f9f9f9;
  border-radius: 12px;
  padding: 16px;
  text-align: center;
  svg {
    font-size: 24px;
    color: #6a8b49;
    margin-bottom: 8px;
  }
  span {
    font-size: 18px;
    font-weight: bold;
    color: #333;
    display: block;
  }
  p {
    font-size: 12px;
    color: #777;
    margin: 0;
  }
`;

const SectionCard = styled.div`
  background-color: #fff;
  margin: 16px;
  border-radius: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 20px;
`;
const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`;
const SettingRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
  &:last-child {
    border-bottom: none;
  }
`;
const SettingInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  svg {
    font-size: 20px;
    color: #6a8b49;
  }
  span {
    font-size: 16px;
    color: #555;
  }
`;
const ActionRow = styled(SettingRow)`
  cursor: pointer;
  svg {
    font-size: 20px;
    color: #6a8b49;
    margin-right: 12px;
  }
  span {
    flex: 1;
  }
  &:after {
    content: ">";
    font-size: 16px;
    color: #ccc;
  }
`;

export default function PerfilPage() {
  const { logout } = useAuth();
  const [userData, setUserData] = useState<UsuarioData | null>(null);
  const [statsData, setStatsData] = useState<StatsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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

  // --- Mock Data
  const mockStats = {
    nivel: 5,
    xpTotalNivel: 1000,
    bio: "Apaixonada pela natureza e preservação da Mata Atlântica.",
    diasConsecutivos: 7,
    missoesCompletas: 18,
    carbonoAbsorvido: 84,
    areaRestaurada: 240,
  };

  if (isLoading) {
    return (
      <PageContainer>
        <h2>Carregando perfil...</h2>
      </PageContainer>
    );
  }

  // Dados reais
  const nome = userData?.nome || "Guardião";
  const avatar = nome[0]?.toUpperCase() || "G";
  const pontos = userData?.pontos_totais || 0;
  const xp = userData?.xp_total || 0;
  const arvores = statsData?.arvoresPlantadas || 0;

  return (
    <PageContainer>
      <Header>
        <IoArrowBack size={24} style={{ cursor: "pointer" }} />
        <HeaderTitle>{"Meu Perfil"}</HeaderTitle>
        <HeaderRight>
          <PontosBadge>{pontos}</PontosBadge>
          <Avatar>{avatar}</Avatar>
        </HeaderRight>
      </Header>

      <ProfileCard>
        <ProfileInfo>
          <ProfileAvatar>{avatar}</ProfileAvatar>
          <ProfileName>{nome}</ProfileName>
          <ProfileBio>{mockStats.bio}</ProfileBio>
        </ProfileInfo>
        <XPBarContainer>
          <ProgressBar progress={(xp / mockStats.xpTotalNivel) * 100} />
          <p>{`${xp} / ${mockStats.xpTotalNivel} XP`}</p>
        </XPBarContainer>
        <StatsGrid>
          <StatItem>
            <IoLeaf />
            <span>{arvores}</span>
            <p>{"Árvores Plantadas"}</p>
          </StatItem>
          <StatItem>
            <IoTrophy />
            <span>{pontos}</span>
            <p>{"Pontos Totais"}</p>
          </StatItem>
          <StatItem>
            <IoFlame />
            <span>{mockStats.diasConsecutivos}</span>
            <p>{"Dias Consecutivos"}</p>
          </StatItem>
          <StatItem>
            <IoTrailSign />
            <span>{mockStats.missoesCompletas}</span>
            <p>{"Missões Completas"}</p>
          </StatItem>
        </StatsGrid>
      </ProfileCard>

      <SectionCard>
        <SectionTitle>
          <IoBarChart /> {"Seu Impacto Ambiental"}
        </SectionTitle>
        <StatItem
          style={{
            background: "#E8F5E9",
            padding: 16,
            borderRadius: 12,
            width: "100%",
            marginBottom: 12,
          }}
        >
          <span>{`${mockStats.carbonoAbsorvido} kg`}</span>
          <p>{"Carbono absorvido"}</p>
        </StatItem>
        <StatItem
          style={{
            background: "#E0F7FF",
            padding: 16,
            borderRadius: 12,
            width: "100%",
          }}
        >
          <span>{`${mockStats.areaRestaurada} m²`}</span>
          <p>{"Área restaurada"}</p>
        </StatItem>
      </SectionCard>

      <SectionCard>
        <SectionTitle>{"⭐ Conquistas (5)"}</SectionTitle>
      </SectionCard>

      <SectionCard>
        <SectionTitle>
          <IoSettingsOutline />
          {"Configurações"}
        </SectionTitle>
        <SettingRow>
          <SettingInfo>
            <IoNotifications />
            <span>{"Notificações"}</span>
          </SettingInfo>
          <ToggleSwitch />
        </SettingRow>
        <SettingRow>
          <SettingInfo>
            <IoLocation />
            <span>{"Localização"}</span>
          </SettingInfo>
          <ToggleSwitch />
        </SettingRow>
        <SettingRow>
          <SettingInfo>
            <IoCalendar />
            <span>{"Lembretes semanais"}</span>
          </SettingInfo>
          <ToggleSwitch />
        </SettingRow>
      </SectionCard>

      <SectionCard>
        <ActionRow>
          <IoShareSocial />
          <span>{"Convidar amigos"}</span>
        </ActionRow>
        <ActionRow>
          <IoGift />
          <span>{"Resgatar recompensas"}</span>
        </ActionRow>
        <ActionRow>
          <IoHelpCircle />
          <span>{"Ajuda e suporte"}</span>
        </ActionRow>
        <ActionRow>
          <IoShieldCheckmark />
          <span>{"Privacidade"}</span>
        </ActionRow>
        <ActionRow onClick={logout} style={{ color: "#D9534F" }}>
          <IoLogOut />
          <span>{"Sair da conta"}</span>
        </ActionRow>
      </SectionCard>
    </PageContainer>
  );
}
