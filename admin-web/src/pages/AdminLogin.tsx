import { useState } from "react";
import styled from "styled-components";
import { useAdminAuth } from "../hooks/useAdminAuth";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(
    135deg,
    #1b5e20 0%,
    #2e7d32 100%
  ); /* Verde Arborizar */
`;

const LoginCard = styled.div`
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 400px;
  text-align: center;
`;

const Title = styled.h1`
  color: #1b5e20;
  margin-bottom: 10px;
  font-size: 24px;
`;

const Subtitle = styled.p`
  color: #666;
  margin-bottom: 30px;
  font-size: 14px;
`;

const Input = styled.input`
  width: 100%;
  padding: 14px;
  margin-bottom: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  background-color: #f9f9f9;
  &:focus {
    border-color: #2e7d32;
    outline: none;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 14px;
  background-color: #2e7d32;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    background-color: #1b5e20;
  }
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  color: #d9534f;
  margin-bottom: 16px;
  font-size: 14px;
  background-color: #ffe6e6;
  padding: 10px;
  border-radius: 6px;
`;

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useAdminAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <Container>
      <LoginCard>
        <Title>Arborizar Admin</Title>
        <Subtitle>Acesso restrito aos gestores</Subtitle>

        <form onSubmit={handleSubmit}>
          <Input
            placeholder="E-mail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Entrando..." : "Acessar Painel"}
          </Button>
        </form>
      </LoginCard>
    </Container>
  );
}
