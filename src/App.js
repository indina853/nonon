import React, { useState } from "react";
import Motoboys from "./Motoboys";
import Pedidos from "./Pedidos";
import Login from "./Login";
import Register from "./Register";
import "./App.css";

function App() {
  const [menu, setMenu] = useState("login");

  return (
    <div className="app">
      <header>
        <h1>🚀 Delivery Manager</h1>
        <nav>
          <button
            className={menu === "login" ? "ativo" : ""}
            onClick={() => setMenu("login")}
          >
            Login
          </button>

          <button
            className={menu === "register" ? "ativo" : ""}
            onClick={() => setMenu("register")}
          >
            Cadastro
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
        {menu === "login" && <Login />}
        {menu === "register" && <Register />}
        {menu === "motoboys" && <Motoboys />}
        {menu === "pedidos" && <Pedidos />}
      </main>
    </div>
  );
}

export default App;
