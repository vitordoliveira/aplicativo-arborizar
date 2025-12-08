import { useState, useEffect } from "react";
import styled from "styled-components";
import {
  IoLeaf,
  IoRibbon,
  IoMap,
  IoBarChart,
  IoLogOut,
  IoFlower,
  IoShield,
} from "react-icons/io5";
import { apiIdentity, apiGeo, apiGamification } from "../services/api";
import { useAdminAuth } from "../hooks/useAdminAuth";
import MissoesAdmin from "./crud/MissoesAdmin";
import EspeciesAdmin from "./crud/EspeciesAdmin";
import InsigniasAdmin from "./crud/InsigniasAdmin";
import ZonasAdmin from "./crud/ZonasAdmin";

const Container = styled.div`
  display: flex;
  height: 100vh;
  background-color: #f4f7f6;
`;
const Sidebar = styled.div`
  width: 260px;
  background: linear-gradient(180deg, #2e7d32 0%, #1b5e20 100%);
  color: white;
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-shadow: 4px 0 10px rgba(0, 0, 0, 0.1);
`;
const LogoArea = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 40px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  h2 {
    font-size: 20px;
    font-weight: bold;
    margin: 0;
  }
`;
const MenuButton = styled.button<{ $active?: boolean }>`
  background: ${(props) => (props.$active ? "rgba(255,255,255,0.2)" : "none")};
  border: none;
  color: white;
  font-size: 16px;
  text-align: left;
  padding: 16px;
  cursor: pointer;
  border-radius: 12px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: all 0.2s;
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    transform: translateX(5px);
  }
`;
const MainContent = styled.div`
  flex: 1;
  padding: 40px;
  overflow-y: auto;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;
const PageTitle = styled.h1`
  font-size: 28px;
  color: #1b5e20;
  font-weight: bold;
`;
const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background-color: #fff;
  color: #d9534f;
  border: 1px solid #d9534f;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: 0.2s;
  &:hover {
    background-color: #d9534f;
    color: white;
  }
`;
const LoadingMessage = styled.p`
  text-align: center;
  margin-top: 50px;
  font-size: 18px;
  color: #666;
`;

type Screen = "dashboard" | "missoes" | "especies" | "insignias" | "zonas";

interface User {
  id_usuario: number;
  nome: string;
  email: string;
  tipo: string;
}

interface DashboardProps {
  onLogout: () => void;
}

export default function Dashboard({ onLogout }: DashboardProps) {
  const [currentScreen, setCurrentScreen] = useState<Screen>("dashboard");
  const { token } = useAdminAuth();

  const [stats, setStats] = useState({
    totalArvores: 0,
    totalMissoes: 0,
    totalAlunos: 0,
  });
  const [isLoadingStats, setIsLoadingStats] = useState(false);

  useEffect(() => {
    if (currentScreen === "dashboard" && token) {
      async function fetchStats() {
        setIsLoadingStats(true);
        try {
          const [plantiosRes, missoesRes, usuariosRes] = await Promise.all([
            apiGeo.get("/plantios"),
            apiGamification.get("/missoes"),
            apiIdentity.get<User[]>("/usuarios"),
          ]);

          const alunos = usuariosRes.data.filter(
            (u: User) => u.tipo === "aluno"
          );

          setStats({
            totalArvores: plantiosRes.data.length,
            totalMissoes: missoesRes.data.length,
            totalAlunos: alunos.length,
          });
        } catch (error) {
          console.error("Erro ao carregar estatísticas:", error);
        } finally {
          setIsLoadingStats(false);
        }
      }
      fetchStats();
    }
  }, [currentScreen, token]);

  const screenTitles: Record<Screen, string> = {
    dashboard: "Visão Geral",
    missoes: "Gerenciar Missões",
    especies: "Catálogo de Espécies",
    insignias: "Gerenciar Insígnias",
    zonas: "Zonas de Plantio",
  };

  const renderContent = () => {
    switch (currentScreen) {
      case "missoes":
        return <MissoesAdmin />;
      case "especies":
        return <EspeciesAdmin />;
      case "insignias":
        return <InsigniasAdmin />;
      case "zonas":
        return <ZonasAdmin />;
      case "dashboard":
      default:
        return (
          <div
            style={{
              background: "white",
              padding: "30px",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            }}
          >
            <h3 style={{ color: "#2E7D32", marginBottom: "10px" }}>
              Bem-vindo ao Painel Administrativo
            </h3>
            <p style={{ color: "#555", marginBottom: "30px" }}>
              Selecione uma opção no menu lateral.
            </p>

            {isLoadingStats ? (
              <LoadingMessage>Carregando estatísticas...</LoadingMessage>
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: "20px",
                }}
              >
                <div
                  style={{
                    padding: "20px",
                    background: "#E8F5E9",
                    borderRadius: "10px",
                    textAlign: "center",
                  }}
                >
                  <h4 style={{ margin: 0, color: "#1B5E20", fontSize: "32px" }}>
                    {stats.totalArvores}
                  </h4>
                  <p style={{ margin: 0, color: "#4CAF50" }}>
                    Árvores Plantadas
                  </p>
                </div>
                <div
                  style={{
                    padding: "20px",
                    background: "#FFF3E0",
                    borderRadius: "10px",
                    textAlign: "center",
                  }}
                >
                  <h4 style={{ margin: 0, color: "#E65100", fontSize: "32px" }}>
                    {stats.totalMissoes}
                  </h4>
                  <p style={{ margin: 0, color: "#FF9800" }}>Missões Ativas</p>
                </div>
                <div
                  style={{
                    padding: "20px",
                    background: "#E3F2FD",
                    borderRadius: "10px",
                    textAlign: "center",
                  }}
                >
                  <h4 style={{ margin: 0, color: "#0D47A1", fontSize: "32px" }}>
                    {stats.totalAlunos}
                  </h4>
                  <p style={{ margin: 0, color: "#2196F3" }}>
                    Alunos Cadastrados
                  </p>
                </div>
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <Container>
      <Sidebar>
        <LogoArea>
          {" "}
          <IoLeaf size={28} /> <h2>Arborizar</h2>{" "}
        </LogoArea>
        <MenuButton
          $active={currentScreen === "dashboard"}
          onClick={() => setCurrentScreen("dashboard")}
        >
          {" "}
          <IoBarChart /> Visão Geral{" "}
        </MenuButton>
        <MenuButton
          $active={currentScreen === "missoes"}
          onClick={() => setCurrentScreen("missoes")}
        >
          {" "}
          <IoRibbon /> Gerenciar Missões{" "}
        </MenuButton>
        <MenuButton
          $active={currentScreen === "insignias"}
          onClick={() => setCurrentScreen("insignias")}
        >
          {" "}
          <IoShield /> Gerenciar Insígnias{" "}
        </MenuButton>
        <MenuButton
          $active={currentScreen === "especies"}
          onClick={() => setCurrentScreen("especies")}
        >
          {" "}
          <IoFlower /> Catálogo de Espécies{" "}
        </MenuButton>
        <MenuButton
          $active={currentScreen === "zonas"}
          onClick={() => setCurrentScreen("zonas")}
        >
          {" "}
          <IoMap /> Zonas de Plantio{" "}
        </MenuButton>
      </Sidebar>
      <MainContent>
        <Header>
          <PageTitle>{screenTitles[currentScreen]}</PageTitle>
          <LogoutButton onClick={onLogout}>
            {" "}
            <IoLogOut size={18} /> Sair{" "}
          </LogoutButton>
        </Header>
        {renderContent()}
      </MainContent>
    </Container>
  );
}
