import React, { useState } from "react";
import { API_URL } from "./api";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const login = async () => {
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        alert("Login realizado com sucesso!");
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert("Erro ao conectar com o servidor.");
      console.error(err);
    }
  };

  return (
    <div>
      <h2>🔐 Login</h2>

      <input
        type="email"
        name="email"
        placeholder="E-mail"
        value={form.email}
        onChange={handleChange}
      />

      <input
        type="password"
        name="password"
        placeholder="Senha"
        value={form.password}
        onChange={handleChange}
      />

      <button onClick={login}>Entrar</button>
    </div>
  );
}

export default Login;
