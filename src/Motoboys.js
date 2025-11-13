import React, { useEffect, useState } from "react";
import { API_URL } from "./api";

function Motoboys() {
  const [motoboys, setMotoboys] = useState([]);
  const [novoMotoboy, setNovoMotoboy] = useState({ nome: "", telefone: "" });

  const carregarMotoboys = async () => {
    try {
      const res = await fetch(`${API_URL}/motoboys`);
      const data = await res.json();
      setMotoboys(data);
    } catch (err) {
      console.error("❌ Erro ao carregar motoboys:", err);
    }
  };

  const adicionarMotoboy = async () => {
    try {
      await fetch(`${API_URL}/motoboys`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoMotoboy),
      });
      setNovoMotoboy({ nome: "", telefone: "" });
      carregarMotoboys();
    } catch (err) {
      console.error("❌ Erro ao adicionar motoboy:", err);
    }
  };

  useEffect(() => {
    carregarMotoboys();
  }, []);

  return (
    <div>
      <h2>🛵 Motoboys</h2>
      <div>
        <input
          placeholder="Nome"
          value={novoMotoboy.nome}
          onChange={(e) => setNovoMotoboy({ ...novoMotoboy, nome: e.target.value })}
        />
        <input
          placeholder="Telefone"
          value={novoMotoboy.telefone}
          onChange={(e) => setNovoMotoboy({ ...novoMotoboy, telefone: e.target.value })}
        />
        <button onClick={adicionarMotoboy}>Adicionar</button>
      </div>

      <ul>
        {motoboys.map((m) => (
          <li key={m._id}>
            {m.nome} — {m.telefone} ({m.status})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Motoboys;
