import React, { useState } from "react";
import { API_URL } from "./api";

function Auth() {
  const [mode, setMode] = useState("login"); // "login" ou "register"

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // ------- LOGIN -------
  const handleLogin = async () => {
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          password: form.password
        })
      });

      const data = await res.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        alert("Login realizado com sucesso!");
      } else {
        alert(data.message || "Erro ao fazer login");
      }
    } catch (err) {
      alert("Erro ao conectar com o servidor.");
    }
  };

  // ------- CADASTRO -------
  const handleRegister = async () => {
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.username,
          email: form.email,
          password: form.password
        })
      });

      const data = await res.json();
      alert(data.message || "Conta criada com sucesso!");

      // Após cadastro, mudar para login
      setMode("login");
    } catch (err) {
      alert("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>{mode === "login" ? "🔐 Login" : "👤 Cadastro"}</h2>

      {mode === "register" && (
        <input
          name="username"
          placeholder="Nome de usuário"
          value={form.username}
          onChange={handleChange}
        />
      )}

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

      {mode === "login" ? (
        <button onClick={handleLogin}>Entrar</button>
      ) : (
        <button onClick={handleRegister}>Criar Conta</button>
      )}

      <p style={{ marginTop: "10px" }}>
        {mode === "login" ? (
          <>
            Não tem conta?{" "}
            <span
              style={{ color: "blue", cursor: "pointer" }}
              onClick={() => setMode("register")}
            >
              Criar conta
            </span>
          </>
        ) : (
          <>
            Já tem conta?{" "}
            <span
              style={{ color: "blue", cursor: "pointer" }}
              onClick={() => setMode("login")}
            >
              Entrar
            </span>
          </>
        )}
      </p>
    </div>
  );
}

export default Auth;
