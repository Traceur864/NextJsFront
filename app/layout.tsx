import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/context/AuthContext";
import "../styles/global.css";


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
