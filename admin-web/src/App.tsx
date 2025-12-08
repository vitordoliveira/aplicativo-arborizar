import { AdminAuthProvider, useAdminAuth } from "./hooks/useAdminAuth";
import Dashboard from "./pages/Dashboard";
import AdminLogin from "./pages/AdminLogin.tsx"; // Vamos criar este componente
import React from "react";

// O componente que decide o que mostrar (Login ou Dashboard)
const AdminRouter: React.FC = () => {
  const { token, logout } = useAdminAuth();

  if (!token) {
    return <AdminLogin />;
  }

  return <Dashboard onLogout={logout} />;
};

// O componente principal que provê o contexto de autenticação
export default function App() {
  return (
    <AdminAuthProvider>
      <AdminRouter />
    </AdminAuthProvider>
  );
}
