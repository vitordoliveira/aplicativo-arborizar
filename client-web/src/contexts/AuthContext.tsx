import { createContext, useState, useEffect } from "react"; // 2. 'useContext' foi removido
import type { ReactNode } from "react"; // 3. 'ReactNode' agora é um import de tipo
import { apiIdentity, apiGeo, apiGamification } from "../services/api.ts"; // 4. Adicionei a extensão .ts

const apis = [apiIdentity, apiGeo, apiGamification];

interface AuthContextData {
  token: string | null;
  isLoading: boolean;
  login: (newToken: string) => Promise<void>;
  logout: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadToken() {
      const storedToken = localStorage.getItem("@Arborizar:token");
      if (storedToken) {
        apis.forEach((api) => {
          api.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${storedToken}`;
        });
        setToken(storedToken);
      }
      setIsLoading(false);
    }
    loadToken();
  }, []);

  const login = async (newToken: string) => {
    localStorage.setItem("@Arborizar:token", newToken);
    apis.forEach((api) => {
      api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
    });
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("@Arborizar:token");
    apis.forEach((api) => {
      delete api.defaults.headers.common["Authorization"];
    });
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
