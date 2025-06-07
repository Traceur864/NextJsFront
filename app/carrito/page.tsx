"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import useAuthRedirect from "@/hooks/useAuthRedirect";
import { ToastContainer, toast } from 'react-toastify';

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
  //const usuario_id = 1;
  const user = localStorage.getItem("user");
  const usuario_id = user ? JSON.parse(user).id: 1; 

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
        toast.success("Pedido realizado con éxito", {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
        setCarrito([]); // Vaciar el carrito en el frontend después de hacer el pedido
        setMostrarFormulario(false); // Ocultar el formulario
      })
      .catch((err) => {
        console.error(err);
        toast.error("Hubo un error al realizar el pedido", {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
      });
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
        toast.success("Producto eliminado correctamente", {
          position: "bottom-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
          theme: "colored",
        });
        setCarrito((prevCarrito) => prevCarrito.filter((item) => item.id !== id));
      })
      .catch((err) => {
        console.error("Error al eliminar producto:", err);
        toast.error("No se pudo eliminar el producto", {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
      });
  };
  

return (
  <div className="min-h-screen bg-gray-100 py-10 px-4">
    <ToastContainer />

    <h1 className="text-3xl font-bold text-center text-blue-700 mb-10">
      Carrito de Compras
    </h1>

    <div className="grid gap-6 max-w-5xl mx-auto">
      {carrito.map((item) => (
        <div
          key={item.id}
          className="bg-white p-6 rounded-lg shadow flex flex-col sm:flex-row sm:justify-between sm:items-center"
        >
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{item.nombre}</h3>
            <p className="text-gray-600">Cantidad: {item.cantidad}</p>
            <p className="text-gray-600">Precio c/u: ${item.precio}</p>
            <p className="text-gray-800 font-medium">Subtotal: ${item.precio * item.cantidad}</p>
          </div>
          <button
            className="mt-4 sm:mt-0 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow"
            onClick={() => eliminarDelCarrito(item.id)}
          >
            Eliminar
          </button>
        </div>
      ))}
    </div>

    {carrito.length > 0 && (
      <div className="text-center mt-10">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-md shadow-md"
          onClick={realizarPedido}
        >
          Realizar Pedido
        </button>
      </div>
    )}

    {mostrarFormulario && (
      <div className="max-w-3xl mx-auto mt-12 bg-white p-8 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Formulario de Envío</h2>

        <div className="grid gap-4">
          <label className="block">
            <span className="text-gray-700">Nombre:</span>
            <input
              type="text"
              name="nombre"
              value={formulario.nombre}
              onChange={manejarEnvio}
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>

          <label className="block">
            <span className="text-gray-700">Correo:</span>
            <input
              type="email"
              name="correo"
              value={formulario.correo}
              onChange={manejarEnvio}
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>

          <label className="block">
            <span className="text-gray-700">Teléfono:</span>
            <input
              type="tel"
              name="telefono"
              value={formulario.telefono}
              onChange={manejarEnvio}
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>

          <label className="block">
            <span className="text-gray-700">Dirección de Envío:</span>
            <textarea
              name="direccion"
              value={formulario.direccion}
              onChange={manejarEnvio}
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>

          <button
            onClick={enviarFormulario}
            className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md shadow-md"
          >
            Confirmar Pedido
          </button>
        </div>
      </div>
    )}
  </div>
);

  
};

export default Carrito;
