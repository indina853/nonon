import React, { useState } from "react";
import Motoboys from "./Motoboys";
import Pedidos from "./Pedidos";
import Auth from "./Auth";
import "./App.css";

function App() {
  const [menu, setMenu] = useState("auth");

  return (
    <div className="app">
      <header>
        <h1>🚀 Delivery Manager</h1>
        <nav>
          <button
            className={menu === "auth" ? "ativo" : ""}
            onClick={() => setMenu("auth")}
          >
            Login / Cadastro
          </button>

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
        </nav>
      </header>

      <main>
        {menu === "auth" && <Auth />}
        {menu === "motoboys" && <Motoboys />}
        {menu === "pedidos" && <Pedidos />}
      </main>
    </div>
  );
}

export default App;
