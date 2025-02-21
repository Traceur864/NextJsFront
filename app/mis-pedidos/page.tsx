"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import useAuthRedirect from "@/hooks/useAuthRedirect";
import './css/style.css'

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
    <div className="mis-pedidos-container">
      <h1>Mis Pedidos</h1>
      {pedidos.length === 0 ? (
        <p className="no-pedidos">No hay pedidos realizados.</p>
      ) : (
        pedidos.map((pedido) => (
          <div key={pedido.id} className="pedido-card">
            <p className="pedido-id"><strong>Pedido ID:</strong> {pedido.id}</p>
            <p className="pedido-total"><strong>Total:</strong> ${pedido.total}</p>
            <p className="pedido-fecha">
              <strong>Fecha:</strong> {new Date(pedido.fecha).toLocaleString()}
            </p>
            <h3>Productos:</h3>
            <ul className="productos-lista">
              {pedido.productos.map((producto, index) => (
                <li key={index} className="producto-item">
                  {producto.nombre} - {producto.cantidad} x ${producto.precio} = <strong>${producto.subtotal}</strong>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default MisPedidos;
