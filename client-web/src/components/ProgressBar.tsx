import styled from "styled-components";

const BarContainer = styled.div`
  width: 100%;
  height: 10px;
  background-color: #e0e0e0;
  border-radius: 5px;
  overflow: hidden; /* Garante que a barra de progresso fique dentro das bordas */
`;

// A barra interna que cresce
const BarFill = styled.div<{ $progress: number }>`
  width: ${(props) => props.$progress}%;
  height: 100%;
  background-color: #6a8b49; /* Nosso verde */
  border-radius: 5px;
  transition: width 0.5s ease-in-out;
`;

interface ProgressBarProps {
  progress: number; // Um número de 0 a 100
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <BarContainer>
      <BarFill $progress={progress} />
    </BarContainer>
  );
}
