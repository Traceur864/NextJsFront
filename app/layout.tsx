import Navbar from "@/components/Navbar";
import "./globals.css";  // Asegúrate de que esta línea esté presente

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
