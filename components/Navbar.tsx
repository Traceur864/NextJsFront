import Link from "next/link";

const Navbar = () => {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/catalogo">Catálogo</Link>
      <Link href="/carrito">Carrito</Link>
      <Link href="/mis-pedidos">Mis Pedidos</Link>
    </nav>
  );
};

export default Navbar;
