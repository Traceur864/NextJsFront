"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import useAuthRedirect from "@/hooks/useAuthRedirect";
import { ToastContainer, toast } from 'react-toastify';
import "./css/styleCatalog.css";

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
    <div>
      {/* Contenedor de notificaciones */}
      <ToastContainer position="bottom-center" />

      <h1>Catálogo de Productos</h1>
      <div id="catalog-container">
        {productos.map((producto) => (
          <div id="card" key={producto.id}>
            <div id="image_container">
              <img
                src={`http://localhost:5000/images/${producto.imagen}`}
                alt={producto.nombre}
                width="100"
                onError={(e) => (e.currentTarget.src = "/GitHUb.jpg")}
              />
            </div>
            <div id="title">
              <span>{producto.nombre}</span>
            </div>
            <div id="size">
              <span>{producto.descripcion}</span>
            </div>
            <div id="moreless">
              <span style={{ paddingRight: "20px" }}>Cantidad:</span> <br />
              <button onClick={() => modificarCantidad(producto.id, -1)}>-</button>
              <span style={{ paddingInlineEnd: "10px", paddingInlineStart: "10px", paddingBlockStart: "3px" }}>
                {cantidades[producto.id]}
              </span>
              <button onClick={() => modificarCantidad(producto.id, 1)}>+</button>
            </div>
            <div id="action">
              <div id="price">
                <span>Precio: ${producto.precio}</span>
              </div>
              <button id="cart-button" onClick={() => agregarAlCarrito(producto.id)}>
                <span>Add to cart</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalogo;
