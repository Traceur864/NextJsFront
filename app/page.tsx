"use client";
import Link from "next/link";
import '../styles/Home/style.css'

const Home = () => {
  return (
    <div className="container">
      {/* Banner Principal */}
      <div className="container-welcome">
        <h1 className="title">Bienvenido(a) a TechShop</h1>
        <p className="subtitle">Tu tienda de productos tecnológicos</p>
      </div>

      {/* Secciones principales */}
      <div className="container-info">
        <h2 className="info">Explora nuestro catálogo</h2>
        <p className="info-p">Descubre los mejores precios en tecnología</p>

        <Link href="/catalogo">
          <button className="button">
            Ver Productos
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
