import { BrowserRouter } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.ts"; // Importa com .ts
import AuthRoutes from "./auth.routes.tsx"; // Importa com .tsx
import AppRoutes from "./app.routes.tsx"; // Importa com .tsx

export default function Routes() {
  const { token, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <h2>{"Carregando..."}</h2>
      </div>
    );
  }

  return (
    <BrowserRouter>{token ? <AppRoutes /> : <AuthRoutes />}</BrowserRouter>
  );
}
