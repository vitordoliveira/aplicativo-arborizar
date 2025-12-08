import { useState, useEffect } from "react";
import styled from "styled-components";
import { apiGamification } from "../services/api.ts";
import MissaoCard from "../components/MissaoCard.tsx";
import type { Missao } from "../components/MissaoCard.tsx";

const PageContainer = styled.div`
  padding: 20px 16px;
`;

const Header = styled.h1`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  color: #333;
  margin-bottom: 24px;
`;

const TabContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const Tab = styled.button<{ $active?: boolean }>`
  flex: 1;
  padding: 14px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  background-color: ${(props) => (props.$active ? "#FFFFFF" : "transparent")};
  color: ${(props) => (props.$active ? "#6A8B49" : "#999")};
  border: none;
  border-bottom: 3px solid
    ${(props) => (props.$active ? "#6A8B49" : "transparent")};
  cursor: pointer;
`;

export default function MissoesPage() {
  const [missoes, setMissoes] = useState<Missao[]>([]);
  const [tabAtiva, setTabAtiva] = useState<"disponiveis" | "concluidas">(
    "disponiveis"
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function carregarMissoes() {
      setIsLoading(true);
      try {
        const response = await apiGamification.get("/missoes");
        setMissoes(response.data);
      } catch (error) {
        console.error("Erro ao buscar missões:", error);
      } finally {
        setIsLoading(false);
      }
    }

    if (tabAtiva === "disponiveis") {
      carregarMissoes();
    }
  }, [tabAtiva]);

  return (
    <PageContainer>
      <Header>{"Suas Missões"}</Header>

      <TabContainer>
        <Tab
          $active={tabAtiva === "disponiveis"}
          onClick={() => setTabAtiva("disponiveis")}
        >
          {"Disponíveis"}
        </Tab>
        <Tab
          $active={tabAtiva === "concluidas"}
          onClick={() => setTabAtiva("concluidas")}
        >
          {"Concluídas"}
        </Tab>
      </TabContainer>

      {tabAtiva === "disponiveis" && (
        <div>
          {isLoading && <p>{"Carregando missões..."}</p>}
          {!isLoading && missoes.length === 0 && (
            <p>{"Nenhuma missão disponível no momento."}</p>
          )}

          {missoes.map((missao) => (
            <MissaoCard key={missao.id_missao} missao={missao} />
          ))}
        </div>
      )}

      {tabAtiva === "concluidas" && (
        <div>
          <p>{"Você ainda não completou nenhuma missão."}</p>
        </div>
      )}
    </PageContainer>
  );
}
