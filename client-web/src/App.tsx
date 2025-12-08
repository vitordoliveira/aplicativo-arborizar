import { AuthProvider } from "./contexts/AuthContext.tsx"; // Importa com .tsx
import Routes from "./routes/index.tsx"; // Importa com .tsx

export default function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}
