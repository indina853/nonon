import React, { useState } from "react";
import Motoboys from "./Motoboys";
import Pedidos from "./Pedidos";
import "./App.css";

function App() {
  const [menu, setMenu] = useState("motoboys");

  return (
    <div className="app">
      <header>
        <h1>🚀 Delivery Manager</h1>
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
        </nav>
      </header>

      <main>
        {menu === "motoboys" ? <Motoboys /> : <Pedidos />}
      </main>
    </div>
  );
}

export default App;
