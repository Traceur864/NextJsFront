"use client";
import Link from "next/link";
//import '../styles/Home/style.css'

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-500 flex flex-col items-center justify-center px-4">
      {/* Banner Principal */}
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-700 mb-4">
          Bienvenido(a) a TechShop
        </h1>
        <p className="text-lg sm:text-xl text-gray-600">
          Tu tienda de productos tecnológicos
        </p>
      </div>

      {/* Sección de llamada a la acción */}
      <div className="text-center bg-white p-8 rounded-xl shadow-md max-w-md w-full">
        <h2 className="text-2xl font-semibold text-blue-600 mb-2">
          Explora nuestro catálogo
        </h2>
        <p className="text-gray-500 mb-6">
          Descubre los mejores precios en tecnología
        </p>

        <Link href="/catalogo">
          <button className="bg-blue-600 hover:bg-blue-500 text-black font-medium px-6 py-3 rounded-lg shadow transition duration-200">
            Ver Productos
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
