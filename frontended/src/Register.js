import React, { useState } from "react";
import { API_URL } from "./api";

function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const register = async () => {
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      alert(data.message || "Conta criada!");

    } catch (err) {
      alert("Erro ao conectar com o servidor.");
      console.error(err);
    }
  };

  return (
    <div>
      <h2>👤 Cadastro</h2>

      <input
        name="username"
        placeholder="Nome de usuário"
        value={form.username}
        onChange={handleChange}
      />

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

      <button onClick={register}>Criar Conta</button>
    </div>
  );
}

export default Register;
