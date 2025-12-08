import { Routes, Route, Navigate } from "react-router-dom";
import WelcomePage from "../pages/WelcomePage.tsx"; // A única rota

export default function AuthRoutes() {
  return (
    <Routes>
      <Route path="/welcome" element={<WelcomePage />} />
      <Route path="*" element={<Navigate to="/welcome" />} />
    </Routes>
  );
}
