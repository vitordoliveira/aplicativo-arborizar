import { useState } from "react";
import { useAuth } from "../hooks/useAuth.ts";
import { apiIdentity } from "../services/api.ts";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 320px;
`;

const Input = styled.input`
  width: 100%;
  padding: 16px;
  font-size: 16px;
  margin-bottom: 12px;
  border: 1px solid #d1d1d1;
  border-radius: 12px;
  background-color: #f8f8f8;
`;

const Button = styled.button`
  width: 100%;
  padding: 16px;
  margin-bottom: 12px;
  border-radius: 12px;
  font-weight: bold;
  font-size: 16px;
  color: #ffffff;
  background-color: #6a8b49;
  border: none;
  cursor: pointer;
  &:disabled {
    background-color: #a9a9a9;
  }
`;

const ErrorMessage = styled.p`
  color: #d9534f;
  margin-top: 10px;
  text-align: center;
`;

export default function LoginForm() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiIdentity.post<{ access_token: string }>(
        "/auth/login",
        { email, password }
      );
      await login(response.data.access_token);
    } catch (err) {
      console.error("Falha no login:", err);
      setError("Credenciais inválidas. Tente novamente.");
      setIsLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Carregando..." : "Entrar"}
      </Button>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Form>
  );
}
