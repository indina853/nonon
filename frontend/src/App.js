import React, { useState, useEffect } from "react";
import Motoboys from "./Motoboys";
import Pedidos from "./Pedidos";
import Auth from "./Auth";
import User from "./User";
import "./App.css";

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
    const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
    const nextTheme = currentTheme === "dark" ? "light" : "dark";

    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("theme", nextTheme);
  };

  // ------------------------ LOGIN ------------------------
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setMenu("motoboys");
  }, []);

  const handleLoginSuccess = () => setMenu("motoboys");

  return (
    <div className="app">

      <header>
        <h1>🚀 Delivery Manager</h1>

        {/* Botão de tema */}
        <button className="theme-toggle" onClick={toggleTheme}>
          🌙
        </button>

        {menu !== "auth" && (
          <nav>
            <button className={menu === "motoboys" ? "ativo" : ""} onClick={() => setMenu("motoboys")}>
              Motoboys
            </button>

            <button className={menu === "pedidos" ? "ativo" : ""} onClick={() => setMenu("pedidos")}>
              Pedidos
            </button>

            <button className={menu === "user" ? "ativo" : ""} onClick={() => setMenu("user")}>
              Usuário
            </button>

            <button
              onClick={() => {
                localStorage.removeItem("token");
                setMenu("auth");
              }}
            >
              Sair
            </button>
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
  );
}

export default App;
