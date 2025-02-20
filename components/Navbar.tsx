"use client";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import '@/styles/navbar/style.css'

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav>
      {/* <Link href="/">Home</Link> */}
      <Link href="/catalogo">Catálogo</Link>
      {user ? (
        <>
          <Link href="/carrito">Carrito</Link>
          <Link href="/mis-pedidos">Mis Pedidos</Link>
          <span id="right">Hola, {user.nombre}</span>
          <button onClick={logout}>Cerrar Sesión</button>
        </>
      ) : (
        <Link id="right" href="/login">Login</Link>
      )}

    </nav>
  );
};

export default Navbar;
