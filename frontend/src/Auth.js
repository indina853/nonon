import React, { useState } from "react";
import { API_URL } from "./api";
import "./Auth.css";

function Auth({ onLoginSuccess }) {
  const [mode, setMode] = useState("login");

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: ""
  });

  const [loading, setLoading] = useState(false);

  // ------------------ MÁSCARA DE TELEFONE ------------------
  const formatPhone = (value) => {
    value = value.replace(/\D/g, "");

    if (value.length <= 10) {
      return value.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
    }

    return value.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
  };

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "phone") {
      value = formatPhone(value);
    }

    setForm({ ...form, [name]: value });
  };

  // ------------------ VALIDAÇÕES ------------------
  const isFullNameValid = form.fullName.trim().split(" ").length >= 2;
  const phoneNumbers = form.phone.replace(/\D/g, "");
  const isPhoneValid = phoneNumbers.length >= 10 && phoneNumbers.length <= 11;

  const isRegisterValid =
    isFullNameValid &&
    isPhoneValid &&
    form.email.length > 3 &&
    form.password.length >= 4;

  // ------------------ LOGIN ------------------
  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) return alert(data.message);

      localStorage.setItem("token", data.token);
      onLoginSuccess();
    } catch (err) {
      alert("Erro ao conectar ao servidor.");
      setLoading(false);
    }
  };

  // ------------------ CADASTRO ------------------
  const handleRegister = async () => {
    if (!isRegisterValid) return;

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName,
          email: form.email,
          password: form.password,
          phone: form.phone.replace(/\D/g, ""),
        }),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) return alert(data.message);

      alert("Conta criada com sucesso!");
      setMode("login");
    } catch (err) {
      alert("Erro ao conectar ao servidor.");
      setLoading(false);
    }
  };

  return (
    <div className="auth-box">
      <h2>{mode === "login" ? "🔐 Login" : "📝 Criar Conta"}</h2>

      {mode === "register" && (
        <>
          <input
            name="fullName"
            placeholder="Nome completo"
            value={form.fullName}
            onChange={handleChange}
          />
          {!isFullNameValid && form.fullName.length > 0 && (
            <p className="error">Digite nome + sobrenome</p>
          )}

          <input
            name="phone"
            placeholder="Telefone"
            value={form.phone}
            onChange={handleChange}
          />
          {!isPhoneValid && form.phone.length > 0 && (
            <p className="error">Telefone inválido</p>
          )}
        </>
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
        <button disabled={loading} onClick={handleLogin}>
          {loading ? "Entrando..." : "Entrar"}
        </button>
      ) : (
        <button
          disabled={!isRegisterValid || loading}
          onClick={handleRegister}
        >
          {loading ? "Criando..." : "Criar Conta"}
        </button>
      )}

      <p className="switch">
        {mode === "login" ? (
          <>
            Não tem conta?
            <span onClick={() => setMode("register")}> Criar</span>
          </>
        ) : (
          <>
            Já tem conta?
            <span onClick={() => setMode("login")}> Entrar</span>
          </>
        )}
      </p>
    </div>
  );
}

export default Auth;
