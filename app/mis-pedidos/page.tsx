"use client";
import { useState, useEffect } from "react";
import axios from "axios";

interface Pedido {
  id: number;
  total: number;
  fecha: string;
}

const MisPedidos = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const usuario_id = 1;

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
          <div key={pedido.id} style={{ border: "1px solid #000", padding: "10px" }}>
            <p>Pedido ID: {pedido.id}</p>
            <p>Total: ${pedido.total}</p>
            <p>Fecha: {new Date(pedido.fecha).toLocaleString()}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default MisPedidos;
