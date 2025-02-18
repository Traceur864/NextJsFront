"use client";
import { useState, useEffect } from "react";
import axios from "axios";

interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
}

const Catalogo = () => {
  const [productos, setProductos] = useState<Producto[]>([]);

  useEffect(() => {
    axios.get("http://localhost:5000/productos")
      .then((res) => setProductos(res.data))
      .catch((err) => console.error(err));
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

const agregarAlCarrito = (producto_id: number) => {
  const usuario_id = 1; // Simulación de usuario
  axios.post("http://localhost:5000/carrito", { usuario_id, producto_id, cantidad: 1 })
    .then(() => alert("Producto agregado al carrito"))
    .catch((err) => console.error(err));
};

export default Catalogo;
