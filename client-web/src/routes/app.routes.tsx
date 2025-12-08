import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../components/MainLayout.tsx";
import HomePage from "../pages/HomePage.tsx";
import MapPage from "../pages/MapPage.tsx";
import MissoesPage from "../pages/MissoesPage.tsx";
import RankingPage from "../pages/RankingPage.tsx";
import PerfilPage from "../pages/PerfilPage.tsx";
import NovoPlantioPage from "../pages/NovoPlantioPage.tsx"; // 1. IMPORTAR

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/inicio" element={<HomePage />} />
        <Route path="/missoes" element={<MissoesPage />} />
        <Route path="/mapa" element={<MapPage />} />
        <Route path="/ranking" element={<RankingPage />} />
        <Route path="/perfil" element={<PerfilPage />} />
      </Route>

      <Route path="/novo-plantio" element={<NovoPlantioPage />} />

      <Route path="*" element={<Navigate to="/inicio" />} />
    </Routes>
  );
}
