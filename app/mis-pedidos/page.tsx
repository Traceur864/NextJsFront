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
  <div className="min-h-screen bg-gray-100 py-10 px-4">
    <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">Mis Pedidos</h1>

    {pedidos.length === 0 ? (
      <p className="text-center text-gray-600 text-lg">No hay pedidos realizados.</p>
    ) : (
      <div className="max-w-4xl mx-auto grid gap-6">
        {pedidos.map((pedido) => (
          <div
            key={pedido.id}
            className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
          >
            <div className="flex justify-between items-center mb-4">
              <p className="text-lg font-semibold text-gray-700">
                Total: <span className="text-green-600">${pedido.total}</span>
              </p>
              <p className="text-sm text-gray-500">
                Fecha: {new Date(pedido.fecha).toLocaleString()}
              </p>
            </div>

            <h3 className="text-gray-800 font-semibold mb-2">Productos:</h3>
            <ul className="space-y-2">
              {pedido.productos.map((producto, index) => (
                <li
                  key={index}
                  className="text-gray-700 border-b last:border-b-0 pb-2"
                >
                  {producto.nombre} – {producto.cantidad} x ${producto.precio} ={" "}
                  <span className="font-medium text-gray-900">${producto.subtotal}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    )}
  </div>
);

};

export default MisPedidos;
