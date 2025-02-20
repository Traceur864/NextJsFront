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

  const getToken = () => {
    return localStorage.getItem("token");
  };

 

  useEffect(() => {
    const user = localStorage.getItem("user");
    console.log(user);

    const token = getToken();
    if (token) {
      axios.get(`http://localhost:5000/carrito/${usuario_id}`,{
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      .then((res) => setCarrito(res.data))
      .catch((err) => console.error(err));
    }
  }, []);

  // Función para realizar el pedido
  const realizarPedido = () => {
    const token = getToken();
    if(token){
    axios.post("http://localhost:5000/pedidos", { usuario_id },{
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then((res) => {
        alert(res.data.mensaje);
        setCarrito([]); // Vaciar el carrito en el frontend después de hacer el pedido
      })
      .catch((err) => console.error(err));
    }
  };

  const eliminarDelCarrito = (id: number) => {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("No hay token de autenticación.");
    return;
  }

  axios.delete(`http://localhost:5000/carrito/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(() => {
      alert("Producto eliminado");
      setCarrito((prevCarrito) => prevCarrito.filter((item) => item.id !== id));
    })
    .catch((err) => {
      console.error("Error al eliminar producto:", err);
      alert("No se pudo eliminar el producto.");
    });
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

/* const eliminarDelCarrito = (id: number) => {
  const token = localStorage.getItem("token");
  if (token) {
    axios.delete(`http://localhost:5000/carrito/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        alert("Producto eliminado");
        //window.location.reload();
      })
      .catch((err) => console.error(err));
  };
};
 */



export default Carrito;
