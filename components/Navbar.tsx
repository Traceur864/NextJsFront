"use client";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/catalogo">Catálogo</Link>
      {user ? (
        <>
          <Link href="/carrito">Carrito</Link>
          <Link href="/mis-pedidos">Mis Pedidos</Link>
          <span>Hola, {user.nombre}</span>
          <button onClick={logout}>Cerrar Sesión</button>
        </>
      ) : (
        <Link href="/login">Login</Link>
      )}

    </nav>
  );
};

export default Navbar;
