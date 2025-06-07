"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import useAuthRedirect from "@/hooks/useAuthRedirect";
import { ToastContainer, toast } from 'react-toastify';

// Definir la interfaz para el producto
interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
}
const Catalogo = () => {
  useAuthRedirect();
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cantidades, setCantidades] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios
        .get("http://localhost:5000/productos")
        .then((res) => {
          setProductos(res.data);
          const cantidadesIniciales: { [key: number]: number } = {};
          res.data.forEach((producto: Producto) => {
            cantidadesIniciales[producto.id] = 1;
          });
          setCantidades(cantidadesIniciales);
        })
        .catch((err) => console.error(err));
    }
  }, []);

  const modificarCantidad = (productoId: number, cambio: number) => {
    setCantidades((prevCantidades) => ({
      ...prevCantidades,
      [productoId]: Math.max(1, (prevCantidades[productoId] || 1) + cambio),
    }));
  };

  const agregarAlCarrito = (producto_id: number) => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    const usuario_id = user ? JSON.parse(user).id : 1;

    if (token) {
      axios
        .post(
          "http://localhost:5000/carrito",
          {
            usuario_id,
            producto_id,
            cantidad: cantidades[producto_id] || 1,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(() => {
          toast.success("Producto agregado al carrito 🛒", {
            position: "bottom-center",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            theme: "colored",
          });
        })
        .catch((err) => {
          console.error(err);
          toast.error("Error al agregar al carrito ❌", {
            position: "bottom-center",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            theme: "colored",
          });
        });
    } else {
      toast.warning("No estás autenticado. Inicia sesión 🔐", {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "colored",
      });
    }
  };

return (
  <div className="min-h-screen bg-gray-100 py-10 px-4">
    <ToastContainer position="bottom-center" />

    <h1 className="text-4xl font-bold text-center mb-10 text-blue-700">
      Catálogo de Productos
    </h1>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {productos.map((producto) => (
        <div
          key={producto.id}
          className="bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300 flex flex-col p-5"
        >
          {/* Imagen del producto */}
          <div className="w-full h-48 overflow-hidden rounded-lg mb-4 bg-gray-50 flex items-center justify-center">
            <img
              src={`http://localhost:5000/images/${producto.imagen}`}
              alt={producto.nombre}
              className="object-contain h-full w-full"
              onError={(e) => {
                e.currentTarget.src = "/imgs/GitHUb.jpg";
              }}
            />
          </div>

          {/* Información del producto */}
          <h2 className="text-lg font-semibold text-center text-gray-800 mb-1">{producto.nombre}</h2>
          <p className="text-sm text-gray-600 text-center mb-4">{producto.descripcion}</p>

          {/* Control de cantidad */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-sm font-medium text-gray-700">Cantidad:</span>
            <button
              onClick={() => modificarCantidad(producto.id, -1)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-2 py-1 rounded"
            >
              -
            </button>
            <span className="font-bold text-gray-800">{cantidades[producto.id]}</span>
            <button
              onClick={() => modificarCantidad(producto.id, 1)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-2 py-1 rounded"
            >
              +
            </button>
          </div>

          {/* Precio y botón */}
          <div className="flex justify-between items-center mt-auto">
            <span className="text-blue-600 font-semibold text-sm">
              Precio: ${producto.precio}
            </span>
            <button
              onClick={() => agregarAlCarrito(producto.id)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm shadow transition"
            >
              Añadir
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);


};

export default Catalogo;
