import React, { useState, useEffect } from "react";
import Motoboys from "./Motoboys";
import Pedidos from "./Pedidos";
import Auth from "./Auth";
import User from "./User";
import "./App.css";

function App() {
  const [menu, setMenu] = useState("auth");

  // ------------------------ CARREGAR TEMA SALVO ------------------------
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    document.documentElement.setAttribute(
      "data-theme",
      savedTheme || "light"
    );
  }, []);

  // ------------------------ FUNÇÃO DE TROCA DE TEMA ------------------------
  const toggleTheme = () => {
    const currentTheme =
      document.documentElement.getAttribute("data-theme") || "light";
    const nextTheme = currentTheme === "dark" ? "light" : "dark";

    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("theme", nextTheme);
  };

  // ------------------------ RECUPERAR MENU SALVO ------------------------
  useEffect(() => {
    const savedMenu = localStorage.getItem("menu");
    const token = localStorage.getItem("token");

    if (!token) {
      setMenu("auth");
      return;
    }

    if (savedMenu) setMenu(savedMenu);
    else setMenu("motoboys");
  }, []);

  // ------------------------ SALVAR MENU AO TROCAR ------------------------
  const changeMenu = (newMenu) => {
    setMenu(newMenu);
    localStorage.setItem("menu", newMenu);
  };

  const handleLoginSuccess = () => {
    changeMenu("motoboys");
    localStorage.setItem("menu", "motoboys");
  };

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
            <button
              className={menu === "motoboys" ? "ativo" : ""}
              onClick={() => changeMenu("motoboys")}
            >
              Motoboys
            </button>

            <button
              className={menu === "pedidos" ? "ativo" : ""}
              onClick={() => changeMenu("pedidos")}
            >
              Pedidos
            </button>

            <button
              className={menu === "user" ? "ativo" : ""}
              onClick={() => changeMenu("user")}
            >
              Usuário
            </button>

            <button
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("menu"); // limpar página salva
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
