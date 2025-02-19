import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/context/AuthContext"; // Importa el contexto de autenticación
import "../styles/global.css"; // Asegúrate de que el archivo exista

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <AuthProvider> {/* 🔹 Envuelve la app en el contexto */}
          <Navbar />
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
