import React, { useState } from "react";
import { API_URL } from "./api";

function Auth({ onLoginSuccess }) {
  const [mode, setMode] = useState("login");
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: ""
  });

  const [loading, setLoading] = useState(false);

  // -------------------------------
  // MÁSCARA AUTOMÁTICA DE TELEFONE
  // -------------------------------
  const formatPhone = (value) => {
    value = value.replace(/\D/g, ""); // remove tudo que não é número

    if (value.length <= 10) {
      return value
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{4})(\d)/, "$1-$2");
    } else {
      return value
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2");
    }
  };

  // -------------------------------
  // ATUALIZA CAMPOS DO FORMULÁRIO
  // -------------------------------
  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "phone") {
      value = formatPhone(value);
    }

    setForm({ ...form, [name]: value });
  };

  // -------------------------------
  // VALIDAR TELEFONE
  // -------------------------------
  const validatePhone = () => {
    const onlyNumbers = form.phone.replace(/\D/g, "");

    if (onlyNumbers.length < 10 || onlyNumbers.length > 11) {
      alert("Telefone inválido. Use DDD + número.");
      return false;
    }

    return true;
  };

  // -------------------------------
  // LOGIN
  // -------------------------------
  const handleLogin = async () => {
    setLoading(true);
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
      setLoading(false);

      if (!res.ok) {
        alert(data.message || "Erro ao fazer login");
        return;
      }

      localStorage.setItem("token", data.token);
      onLoginSuccess();

    } catch (err) {
      setLoading(false);
      alert("Erro ao conectar com o servidor.");
    }
  };

  // -------------------------------
  // CADASTRO
  // -------------------------------
  const handleRegister = async () => {
    if (!validatePhone()) return;

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName,
          email: form.email,
          password: form.password,
          phone: form.phone
        })
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        alert(data.message || "Erro ao criar conta");
        return;
      }

      alert(`Conta criada!\nSeu usuário: @${data.usernameGerado}`);

      setMode("login");

    } catch (err) {
      setLoading(false);
      alert("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "auto",
        padding: 20,
        background: "var(--bg2)",
        borderRadius: 12,
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        marginTop: 40
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: 20 }}>
        {mode === "login" ? "🔐 Login" : "👤 Criar Conta"}
      </h2>

      {mode === "register" && (
        <>
          <input
            name="fullName"
            placeholder="Nome completo"
            value={form.fullName}
            onChange={handleChange}
            required
          />

          <input
            name="phone"
            placeholder="Telefone"
            value={form.phone}
            onChange={handleChange}
            maxLength={15}
            required
          />
        </>
      )}

      <input
        type="email"
        name="email"
        placeholder="E-mail"
        value={form.email}
        onChange={handleChange}
        required
      />

      <div style={{ position: "relative" }}>
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Senha"
          value={form.password}
          onChange={handleChange}
          required
          style={{ width: "100%" }}
        />

        <span
          onClick={() => setShowPassword(!showPassword)}
          style={{
            position: "absolute",
            right: 10,
            top: 10,
            cursor: "pointer",
            opacity: 0.7
          }}
        >
          {showPassword ? "👁️" : "🙈"}
        </span>
      </div>

      {mode === "login" ? (
        <button disabled={loading} onClick={handleLogin}>
          {loading ? "Entrando..." : "Entrar"}
        </button>
      ) : (
        <button disabled={loading} onClick={handleRegister}>
          {loading ? "Criando..." : "Criar Conta"}
        </button>
      )}

      <p style={{ marginTop: 12, textAlign: "center", fontSize: 14 }}>
        {mode === "login" ? (
          <>
            Não tem conta?{" "}
            <span
              style={{ color: "#007bff", cursor: "pointer", fontWeight: "bold" }}
              onClick={() => setMode("register")}
            >
              Criar conta
            </span>
          </>
        ) : (
          <>
            Já tem conta?{" "}
            <span
              style={{ color: "#007bff", cursor: "pointer", fontWeight: "bold" }}
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
