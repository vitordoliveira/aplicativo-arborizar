import React, { createContext, useContext, useState, useEffect } from "react";
import { apiIdentity, apiGeo, apiGamification } from "../services/api";

// 1. Define a interface do contexto
interface AdminAuthContextType {
  token: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
}

// 2. Cria o contexto
const AdminAuthContext = createContext<AdminAuthContextType | undefined>(
  undefined
);

// 3. Provedor de Autenticação
export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("adminToken")
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Efeito para configurar os headers do Axios quando o token muda
  useEffect(() => {
    if (token) {
      apiIdentity.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      apiGeo.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      apiGamification.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;
    } else {
      // Limpa os headers se não houver token
      delete apiIdentity.defaults.headers.common["Authorization"];
      delete apiGeo.defaults.headers.common["Authorization"];
      delete apiGamification.defaults.headers.common["Authorization"];
    }
  }, [token]);

  // Função de Login
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiIdentity.post("/auth/login", {
        email,
        password,
      });
      const accessToken = response.data.access_token;
      setToken(accessToken);
      localStorage.setItem("adminToken", accessToken); // Persiste o token
      return true;
    } catch (err) {
      console.error("Erro no login do Admin:", err);
      setError("Credenciais inválidas ou você não é um Admin.");
      setToken(null);
      localStorage.removeItem("adminToken");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Função de Logout
  const logout = () => {
    setToken(null);
    localStorage.removeItem("adminToken");
    // Os headers são limpos pelo useEffect
  };

  return (
    <AdminAuthContext.Provider
      value={{ token, login, logout, isLoading, error }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

// 4. Hook personalizado para usar o contexto
// eslint-disable-next-line react-refresh/only-export-components
export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
};
