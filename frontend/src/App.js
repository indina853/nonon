import React, { useState, useEffect } from "react";
import Motoboys from "./Motoboys";
import Pedidos from "./Pedidos";
import Auth from "./Auth";
import User from "./User";  // <-- IMPORTANTE
import "./App.css";

function App() {
  const [menu, setMenu] = useState("auth");

  // Verificar token ao carregar o app (manter o login)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setMenu("motoboys"); // já logado → vai direto pro app
    }
  }, []);

  // Quando o login for bem-sucedido
  const handleLoginSuccess = () => {
    setMenu("motoboys"); // muda para o app automaticamente
  };

  return (
    <div className="app">
      <header>
        <h1>🚀 Delivery Manager</h1>

        {menu !== "auth" && (
          <nav>
            <button
              className={menu === "motoboys" ? "ativo" : ""}
              onClick={() => setMenu("motoboys")}
            >
              Motoboys
            </button>

            <button
              className={menu === "pedidos" ? "ativo" : ""}
              onClick={() => setMenu("pedidos")}
            >
              Pedidos
            </button>

            <button
              className={menu === "user" ? "ativo" : ""}
              onClick={() => setMenu("user")}
            >
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
        {menu === "user" && <User />}   {/* <-- AQUI */}
      </main>
    </div>
  );
}

export default App;
