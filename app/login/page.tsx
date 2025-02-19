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
      {/* <h2>Iniciar Sesión</h2> */}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {/* <form onSubmit={handleLogin}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <br/>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" required />
        <br/>
        <button type="submit">Iniciar Sesión</button>
      </form> */}

<p id="form-title">Iniciar Sesión</p>
<form onSubmit={handleLogin}>
 <div id="input-container">
   <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
   <span>
     <svg stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
       <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"></path>
     </svg>
   </span>
</div>
<div id="input-container">
   <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" required />

   <span>
     <svg stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
       <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"></path>
       <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"></path>
     </svg>
   </span>
 </div>
 <button id="submit" type="submit">
        Iniciar Sesión
      </button>
</form>


    </div>

    
  );
};

export default Login;
