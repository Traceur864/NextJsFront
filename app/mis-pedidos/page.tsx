"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import useAuthRedirect from "@/hooks/useAuthRedirect";

interface Producto {
  nombre: string;
  cantidad: number;
  precio: number;
  subtotal: number;
}

interface Pedido {
  id: number;
  total: number;
  fecha: string;
  productos: Producto[];
}

const MisPedidos = () => {
  useAuthRedirect(); // Si el usuario no está autenticado, lo redirige a /login
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  //const usuario_id = 1;
  const user = localStorage.getItem("user");
  const usuario_id = user ? JSON.parse(user).id: 1; 

  useEffect(() => {
    axios.get(`http://localhost:5000/pedidos/${usuario_id}`)
      .then((res) => setPedidos(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>Mis Pedidos</h1>
      {pedidos.length === 0 ? <p>No hay pedidos realizados.</p> : (
        pedidos.map((pedido) => (
          <div key={pedido.id} style={{ border: "1px solid #000", padding: "10px", marginBottom: "20px" }}>
            <p><strong>Pedido ID:</strong> {pedido.id}</p>
            <p><strong>Total:</strong> ${pedido.total}</p>
            <p><strong>Fecha:</strong> {new Date(pedido.fecha).toLocaleString()}</p>
            <h3>Productos:</h3>
            
              {pedido.productos.map((producto, index) => (
                <span key={index}>
                  {producto.nombre} - {producto.cantidad} x ${producto.precio} = ${producto.subtotal}
                  <br /></span>
              ))}
          </div>
        ))
      )}
    </div>
  );
};

export default MisPedidos;
