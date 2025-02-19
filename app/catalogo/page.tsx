"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import './css/styleCatalog.css'

// Definir la interfaz para el producto
interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
}

const Catalogo = () => {
  const [productos, setProductos] = useState<Producto[]>([]);  // Asegúrate de que el estado sea de tipo Producto[]

  // Función para obtener el token del localStorage
  const getToken = () => {
    return localStorage.getItem("token");
  };

  useEffect(() => {
    //const token = getToken();
    //if (token) {
      axios.get("http://localhost:5000/productos", {
        /* headers: {
          Authorization: `Bearer ${token}`,  // Enviar el token en los encabezados
        }, */
      })
        .then((res) => setProductos(res.data))  // Asignar los productos correctamente
        .catch((err) => console.error(err));
   /*  } else {
      console.log("No se encontró el token de autenticación.");
    } */
  }, []);

  return (
    <div>
      <h1>Catálogo de Productos</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {productos.map((producto) => (
          <div key={producto.id} style={{ border: "1px solid #000", padding: "10px" }}>
            <img src={producto.imagen} alt={producto.nombre} width="100" />
            <h3>{producto.nombre}</h3>
            <p>{producto.descripcion}</p>
            <p>Precio: ${producto.precio}</p>
            <button onClick={() => agregarAlCarrito(producto.id)}>Agregar al Carrito</button>
          </div>
        ))}
      </div>
    </div>
  );
};

// Función para agregar un producto al carrito
const agregarAlCarrito = (producto_id: number) => {
  const token = localStorage.getItem("token"); // Obtener el token del localStorage
  const usuario_id = 1; // Simulación de usuario (puedes cambiar esto si usas el contexto de autenticación)

  if (token) {
    axios.post("http://localhost:5000/carrito", { usuario_id, producto_id, cantidad: 1 }, {
      headers: {
        Authorization: `Bearer ${token}`,  // Agregar el token a los encabezados
      },
    })
      .then(() => alert("Producto agregado al carrito"))
      .catch((err) => console.error(err));
  } else {
    alert("No estás autenticado. Por favor, inicia sesión.");
  }
};

export default Catalogo;
