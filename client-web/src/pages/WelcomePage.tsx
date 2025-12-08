import { useState } from "react";
import styled, { keyframes, css } from "styled-components";
import LoginForm from "../components/LoginForm.tsx";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const WelcomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 24px;
  height: 100vh;
  text-align: center;
`;

const LogoImage = styled.img`
  width: 250px;
  height: auto;
  margin-bottom: 24px;
`;

const Title = styled.h1`
  font-size: 22px;
  color: #4b4b4b;
  margin-bottom: 12px;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: #555;
  line-height: 1.6;
  max-width: 300px;
  margin-bottom: 8px;
`;

const Prompt = styled.p`
  font-size: 14px;
  color: #777;
  margin-bottom: 32px;
`;

const AnimatedContainer = styled.div<{ $visible: boolean }>`
  width: 100%;
  max-width: 320px;
  display: ${(props) => (props.$visible ? "flex" : "none")};
  flex-direction: column;
  animation: ${(props) =>
    props.$visible
      ? css`
          ${fadeIn} 0.5s ease-out forwards
        `
      : "none"};
`;

const Button = styled.button<{ $primary?: boolean }>`
  width: 100%;
  padding: 16px;
  margin-bottom: 12px;
  border-radius: 12px;
  text-decoration: none;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;

  color: ${(props) => (props.$primary ? "#FFFFFF" : "#6A8B49")};
  background-color: ${(props) => (props.$primary ? "#6A8B49" : "#FFFFFF")};
  border: 1px solid ${(props) => (props.$primary ? "#6A8B49" : "#D1D1D1")};

  &:hover {
    opacity: 0.9;
  }
`;

const BackButton = styled.button`
  color: #777;
  background: none;
  border: none;
  font-size: 14px;
  margin-top: 16px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

export default function WelcomePage() {
  const [mode, setMode] = useState<"welcome" | "login" | "register">("welcome");

  return (
    <WelcomeContainer>
      <LogoImage src="/logo-arborizar.png" alt="Projeto Arborizar" />

      <Title>
        {mode === "welcome" && "Junte-se aos Guardiões da Mata Atlântica"}
        {mode === "login" && "Já tenho uma conta"}
        {mode === "register" && "Quero ser um Guardião!"}
      </Title>

      {mode === "welcome" && (
        <>
          <Subtitle>
            {
              "Bem-vindo(a) ao Arborizar! O aplicativo que transforma você no herói do meio ambiente da nossa cidade."
            }
          </Subtitle>
          <Prompt>
            {"Pronto para começar sua missão como Guardião da Mata Atlântica?"}
          </Prompt>
        </>
      )}

      <AnimatedContainer $visible={mode === "welcome"}>
        <Button onClick={() => setMode("register")} $primary>
          {"Quero ser um Guardião!"}
        </Button>
        <Button onClick={() => setMode("login")}>{"Já tenho uma conta"}</Button>
      </AnimatedContainer>

      <AnimatedContainer $visible={mode === "login"}>
        <LoginForm />
        <BackButton onClick={() => setMode("welcome")}>{"< Voltar"}</BackButton>
      </AnimatedContainer>

      <AnimatedContainer $visible={mode === "register"}>
        <p>{"Aqui ficará o formulário de cadastro..."}</p>
        <BackButton onClick={() => setMode("welcome")}>{"< Voltar"}</BackButton>
      </AnimatedContainer>
    </WelcomeContainer>
  );
}
