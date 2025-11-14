import React, { useState, useEffect } from "react";
import Motoboys from "./Motoboys";
import Pedidos from "./Pedidos";
import Auth from "./Auth";
import User from "./User";
import "./App.css";

import toast, { Toaster } from "react-hot-toast";

function App() {
  const [menu, setMenu] = useState("auth");

  // ------------------------ TEMA ------------------------
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
      document.documentElement.setAttribute("data-theme", savedTheme);
    } else {
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, []);

  const toggleTheme = () => {
    const currentTheme =
      document.documentElement.getAttribute("data-theme") || "light";
    const nextTheme = currentTheme === "dark" ? "light" : "dark";

    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("theme", nextTheme);

    toast.success(`Tema alterado para: ${nextTheme === "dark" ? "Escuro 🌙" : "Claro ☀️"}`);
  };

  // ------------------------ LOGIN ------------------------
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setMenu("motoboys");
  }, []);

  const handleLoginSuccess = () => {
    toast.success("Login realizado com sucesso! 🔓");
    setMenu("motoboys");
  };

  const logout = () => {
    localStorage.removeItem("token");
    setMenu("auth");
    toast("Você saiu 👋");
  };

  return (
    <>
      {/* Toast Notifications */}
      <Toaster position="top-center" />

      <div className="app">
        <header>
          <h1>🚀 Delivery Manager</h1>

          {/* Botão de tema */}
          <button className="theme-toggle" onClick={toggleTheme}>
            🌙
          </button>

          {menu !== "auth" && (
            <nav>
              <button
                className={menu === "motoboys" ? "ativo" : ""}
                onClick={() => {
                  setMenu("motoboys");
                  toast("Motoboys", { icon: "🏍️" });
                }}
              >
                Motoboys
              </button>

              <button
                className={menu === "pedidos" ? "ativo" : ""}
                onClick={() => {
                  setMenu("pedidos");
                  toast("Pedidos", { icon: "📦" });
                }}
              >
                Pedidos
              </button>

              <button
                className={menu === "user" ? "ativo" : ""}
                onClick={() => {
                  setMenu("user");
                  toast("Perfil do usuário", { icon: "👤" });
                }}
              >
                Usuário
              </button>

              <button onClick={logout}>Sair</button>
            </nav>
          )}
        </header>

        <main>
          {menu === "auth" && <Auth onLoginSuccess={handleLoginSuccess} />}
          {menu === "motoboys" && <Motoboys />}
          {menu === "pedidos" && <Pedidos />}
          {menu === "user" && <User key={Date.now()} />}
        </main>
      </div>
    </>
  );
}

export default App;
