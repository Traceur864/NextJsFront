"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import './catalogo/css/styleCatalog.css'

const Home = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Bienvenido(a)</h2>
      <p style={{marginTop: '12px'}}>Compras de productos tecnologicos</p>
    </div>
  );
};

export default Home;
