import React, { useEffect, useState } from "react";
import { API_URL } from "./api";

function Pedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [novoPedido, setNovoPedido] = useState({ cliente: "", item: "", status: "Pendente" });

  const carregarPedidos = async () => {
    try {
      const res = await fetch(`${API_URL}/pedidos`);
      const data = await res.json();
      setPedidos(data);
    } catch (err) {
      console.error("❌ Erro ao carregar pedidos:", err);
    }
  };

  const adicionarPedido = async () => {
    try {
      await fetch(`${API_URL}/pedidos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoPedido),
      });
      setNovoPedido({ cliente: "", item: "", status: "Pendente" });
      carregarPedidos();
    } catch (err) {
      console.error("❌ Erro ao adicionar pedido:", err);
    }
  };

  useEffect(() => {
    carregarPedidos();
  }, []);

  return (
    <div>
      <h2>📦 Pedidos</h2>
      <div>
        <input
          placeholder="Cliente"
          value={novoPedido.cliente}
          onChange={(e) => setNovoPedido({ ...novoPedido, cliente: e.target.value })}
        />
        <input
          placeholder="Item"
          value={novoPedido.item}
          onChange={(e) => setNovoPedido({ ...novoPedido, item: e.target.value })}
        />
        <select
          value={novoPedido.status}
          onChange={(e) => setNovoPedido({ ...novoPedido, status: e.target.value })}
        >
          <option value="Pendente">Pendente</option>
          <option value="Em entrega">Em entrega</option>
          <option value="Entregue">Entregue</option>
        </select>
        <button onClick={adicionarPedido}>Adicionar</button>
      </div>

      <ul>
        {pedidos.map((p) => (
          <li key={p._id}>
            <b>{p.cliente}</b> — {p.item} ({p.status})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Pedidos;
