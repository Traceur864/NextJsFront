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
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cantidades, setCantidades] = useState<{ [key: number]: number }>({}); // Estado para cantidades

  // Función para obtener el token del localStorage
  const getToken = () => {
    return localStorage.getItem("token");
  };

  useEffect(() => {
    axios.get("http://localhost:5000/productos")
      .then((res) => {
        setProductos(res.data);
        // Inicializar el estado de cantidades con valor 1 para cada producto
        const cantidadesIniciales: { [key: number]: number } = {};
        res.data.forEach((producto: Producto) => {
          cantidadesIniciales[producto.id] = 1;
        });
        setCantidades(cantidadesIniciales);
      })
      .catch((err) => console.error(err));
  }, []);

   // Función para cambiar la cantidad de un producto
   const modificarCantidad = (productoId: number, cambio: number) => {
    setCantidades((prevCantidades) => ({
      ...prevCantidades,
      [productoId]: Math.max(1, (prevCantidades[productoId] || 1) + cambio), // Evitar valores menores a 1
    }));
  };

  // Función para agregar un producto al carrito
  const agregarAlCarrito = (producto_id: number) => {
  const token = localStorage.getItem("token"); // Obtener el token del localStorage
  //const usuario_id = 1; // Simulación de usuario (puedes cambiar esto si usas el contexto de autenticación)
  const user = localStorage.getItem("user");
  const usuario_id = user ? JSON.parse(user).id: 1;  // Default to 1 if no user object found
  console.log(usuario_id);
  
  if (token) {
    axios.post("http://localhost:5000/carrito", { 
      usuario_id, 
      producto_id,
      cantidad: cantidades[producto_id] || 1, // Tomar la cantidad actual
      }, {
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

  return (
    <div>
      <h1>Catálogo de Productos</h1>
      <div id="catalog-container">
        {productos.map((producto) => (
          <div id="card" key={producto.id}>
            <div id="image_container">
              <img
                src={`http://localhost:5000/images/${producto.imagen}`}
                alt={producto.nombre}
                width="100"
                onError={(e) => (e.currentTarget.src = "/GitHUb.jpg")}
              />
            </div>
            <div id="title">
              <span>{producto.nombre}</span>
            </div>
            <div id="size">
              <span>{producto.descripcion}</span>
            </div>
            <div id="moreless">
              <span style={{paddingRight: "20px"}}>Cantidad:</span> <br />
              <button onClick={() => modificarCantidad(producto.id, -1)}>-</button>
              <span style={{paddingInlineEnd: '10px', paddingInlineStart: '10px', paddingBlockStart: '3px'}}>{cantidades[producto.id]}</span>
              <button onClick={() => modificarCantidad(producto.id, 1)}>+</button>
            </div>
            <div id="action">
              <div id="price">
                <span>Precio: ${producto.precio}</span>
              </div>
              <button id="cart-button" onClick={() => agregarAlCarrito(producto.id)}>
                <span>Add to cart</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

};

export default Catalogo;
