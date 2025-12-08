import styled from "styled-components";

const CardContainer = styled.div`
  background-color: #ffffff;
  border-radius: 20px;
  padding: 20px;
  margin-bottom: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border: 1px solid #f0f0f0;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
`;

const IconContainer = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 12px;
  background-color: #e8f5e9; /* Um verde-claro para o ícone */
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
  font-size: 24px;
  color: #6a8b49;
`;

const TitleInfo = styled.div`
  flex: 1;
`;

const Title = styled.h3`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin: 0;
`;

const Tag = styled.span<{ $especial?: boolean }>`
  font-size: 12px;
  font-weight: bold;
  padding: 4px 8px;
  border-radius: 8px;
  margin-top: 4px;
  display: inline-block;

  /* Lógica de cor baseada no seu Figma */
  color: ${(props) => (props.$especial ? "#FF8C00" : "#4CAF50")};
  background-color: ${(props) => (props.$especial ? "#FFF3E0" : "#E8F5E9")};
`;

const Description = styled.p`
  font-size: 14px;
  color: #666;
  line-height: 1.5;
  margin-bottom: 16px;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #555;
  margin-bottom: 8px;
`;

const Button = styled.button<{ $especial?: boolean }>`
  width: 100%;
  padding: 14px;
  border-radius: 12px;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  border: none;
  margin-top: 16px;

  /* Lógica de cor baseada no seu Figma */
  color: #ffffff;
  background-color: ${(props) => (props.$especial ? "#FF8C00" : "#006400")};
`;

export interface Missao {
  id_missao: number;
  titulo: string;
  descricao: string;
  pontos_recompensa: number;
  xp_recompensa: number;
}

interface MissaoCardProps {
  missao: Missao;
}

export default function MissaoCard({ missao }: MissaoCardProps) {
  const isEspecial = missao.titulo.includes("Operação Girassol");
  const tagText = isEspecial ? "Especial" : "Médio"; // Mockado
  const local = isEspecial ? "Praça da Cultura" : "Rio Juqueriquerê"; // Mockado

  return (
    <CardContainer>
      <Header>
        <IconContainer>{isEspecial ? "🌻" : "🌳"}</IconContainer>
        <TitleInfo>
          <Title>{missao.titulo}</Title>
          <Tag $especial={isEspecial}>{tagText}</Tag>
        </TitleInfo>
      </Header>

      <Description>{missao.descricao}</Description>

      <InfoRow>{`📍 ${local}`}</InfoRow>
      <InfoRow>{`🏆 +${missao.pontos_recompensa} Pontos`}</InfoRow>

      <Button $especial={isEspecial}>
        {isEspecial ? "Aceitar Missão Especial" : "Aceitar Missão"}
      </Button>
    </CardContainer>
  );
}
