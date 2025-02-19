"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import useAuthRedirect from "@/hooks/useAuthRedirect";

interface ProductoCarrito {
  id: number;
  nombre: string;
  cantidad: number;
  precio: number;
}

const Carrito = () => {
  useAuthRedirect(); // Si el usuario no está autenticado, lo redirige a /login
  const [carrito, setCarrito] = useState<ProductoCarrito[]>([]);
  const usuario_id = 1;

  useEffect(() => {
    axios.get(`http://localhost:5000/carrito/${usuario_id}`)
      .then((res) => setCarrito(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Función para realizar el pedido
  const realizarPedido = () => {
    axios.post("http://localhost:5000/pedidos", { usuario_id })
      .then((res) => {
        alert(res.data.mensaje);
        setCarrito([]); // Vaciar el carrito en el frontend después de hacer el pedido
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h1>Carrito de Compras</h1>
      {carrito.length === 0 ? <p>No hay productos en el carrito.</p> : (
        carrito.map((item) => (
          <div key={item.id} style={{ border: "1px solid #000", padding: "10px" }}>
            <h3>{item.nombre}</h3>
            <p>Cantidad: {item.cantidad}</p>
            <p>Precio: ${item.precio}</p>
            <button onClick={() => eliminarDelCarrito(item.id)}>Eliminar</button>
          </div>
        ))
      )}
      {/* Botón para realizar el pedido */}
      {carrito.length > 0 && (
        <button onClick={realizarPedido}>Realizar Pedido</button>
      )}
    </div>
  );
};

const eliminarDelCarrito = (id: number) => {
  axios.delete(`http://localhost:5000/carrito/${id}`)
    .then(() => {
      alert("Producto eliminado");
      window.location.reload();
    })
    .catch((err) => console.error(err));
};

export default Carrito;
