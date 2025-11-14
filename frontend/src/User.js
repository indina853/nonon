import React, { useState, useEffect } from "react";
import { API_URL } from "./api";

function User() {
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    phone: "",
    username: "",
  });

  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const token = localStorage.getItem("token");

  // Buscar informações do usuário
  useEffect(() => {
    fetch(`${API_URL}/auth/me`, {
      headers: { Authorization: "Bearer " + token },
    })
      .then((res) => res.json())
      .then((data) =>
        setUser({
          fullName: data.fullName || "",
          email: data.email || "",
          phone: data.phone || "",
          username: data.username || "",
        })
      )
      .catch((err) => console.error(err));
  }, [token]);

  const handleUserChange = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const handlePasswordChange = (e) =>
    setPasswords({ ...passwords, [e.target.name]: e.target.value });

  const saveProfile = async () => {
    try {
      const res = await fetch(`${API_URL}/auth/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          fullName: user.fullName,
          email: user.email,
          phone: user.phone,
        }),
      });

      const data = await res.json();
      alert(data.message || "Perfil atualizado!");
    } catch (err) {
      alert("Erro ao salvar.");
    }
  };

  const changePassword = async () => {
    try {
      const res = await fetch(`${API_URL}/auth/password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(passwords),
      });

      const data = await res.json();
      alert(data.message || "Senha alterada!");

      setPasswords({ oldPassword: "", newPassword: "" });
    } catch (err) {
      alert("Erro ao alterar senha.");
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "auto" }}>
      <h2>👤 Olá, {user.fullName?.split(" ")[0] || "Usuário"}!</h2>
      <p style={{ opacity: 0.7, marginTop: -10 }}>
        @{user.username || "carregando..."}
      </p>

      <h3>Informações pessoais</h3>

      <input
        name="fullName"
        placeholder="Nome completo"
        value={user.fullName}
        onChange={handleUserChange}
      />

      <input
        name="email"
        placeholder="E-mail"
        value={user.email}
        onChange={handleUserChange}
      />

      <input
        name="phone"
        placeholder="Telefone"
        value={user.phone}
        onChange={handleUserChange}
      />

      <button onClick={saveProfile}>Salvar alterações</button>

      <h3 style={{ marginTop: "20px" }}>Alterar senha</h3>

      <input
        type="password"
        name="oldPassword"
        placeholder="Senha atual"
        value={passwords.oldPassword}
        onChange={handlePasswordChange}
      />

      <input
        type="password"
        name="newPassword"
        placeholder="Nova senha"
        value={passwords.newPassword}
        onChange={handlePasswordChange}
      />

      <button onClick={changePassword}>Alterar senha</button>
    </div>
  );
}

export default User;
