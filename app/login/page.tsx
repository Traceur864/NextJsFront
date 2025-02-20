"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import "./css/styleLogin.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      // Actualizamos el contexto con los datos de usuario y token
      login(data.user, data.token);
      // Redirigimos al catálogo
      router.push("/catalogo");
    } else {
      setError(data.error);
    }
  };

return (
    <div>
      <p id="form-title">Iniciar Sesión</p>
        {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <div id="input-container">
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        </div>
        <div id="input-container">
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" required />
        </div>
        <button id="submit" type="submit">Iniciar Sesión</button>
      </form>
    </div>

    
  );
};

export default Login;
