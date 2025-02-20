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
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [formulario, setFormulario] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    direccion: "",
  });
  const [pedido, setPedido] = useState<any>(null);
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

  const realizarPedido = () => {
    setMostrarFormulario(true); // Mostrar el formulario para ingresar los datos de envío
  };

  const manejarEnvio = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormulario((prev) => ({ ...prev, [name]: value }));
  };

  const enviarFormulario = () => {
    const token = getToken();
    if (token && formulario.nombre && formulario.correo && formulario.telefono && formulario.direccion) {
      axios.post("http://localhost:5000/pedidos", 
        { 
          usuario_id, 
          nombre: formulario.nombre,
          correo: formulario.correo,
          telefono: formulario.telefono,
          direccion: formulario.direccion,
           
        }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        alert(res.data.mensaje);
        setCarrito([]); // Vaciar el carrito en el frontend después de hacer el pedido
        setMostrarFormulario(false); // Ocultar el formulario
      })
      .catch((err) => console.error(err));
    } else {
      alert("Por favor, completa todos los campos.");
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
            <p>Precio c/u: ${item.precio}</p>
            <p>Subtotal: ${item.precio * item.cantidad}</p>
            <button onClick={() => eliminarDelCarrito(item.id)}>Eliminar</button>
          </div>
        ))
      )}
      {carrito.length > 0 && (
        <button onClick={realizarPedido}>Realizar Pedido</button>
      )}

{mostrarFormulario && (
        <div>
          <h2>Formulario de Envío</h2>
          <label>
            Nombre:
            <input
              type="text"
              name="nombre"
              value={formulario.nombre}
              onChange={manejarEnvio}
            />
          </label>
          <label>
            Correo:
            <input
              type="email"
              name="correo"
              value={formulario.correo}
              onChange={manejarEnvio}
            />
          </label>
          <label>
            Teléfono:
            <input
              type="tel"
              name="telefono"
              value={formulario.telefono}
              onChange={manejarEnvio}
            />
          </label>
          <label>
            Dirección de Envío:
            <textarea
              name="direccion"
              value={formulario.direccion}
              onChange={manejarEnvio}
            />
          </label>
          <button onClick={enviarFormulario}>Confirmar Pedido</button>
        </div>
      )}
    </div>
  );
};




export default Carrito;
