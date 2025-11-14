import React, { useEffect, useState } from "react";
import { API_URL } from "./api";

function Motoboys() {
  const [motoboys, setMotoboys] = useState([]);
  const [novo, setNovo] = useState({ nome: "", telefone: "" });

  // ------------------ MÁSCARA DE TELEFONE ------------------
  const formatarTelefone = (valor) => {
    let v = valor.replace(/\D/g, "");

    if (v.length > 11) v = v.slice(0, 11);

    if (v.length <= 10) {
      return v
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{4})(\d)/, "$1-$2");
    } else {
      return v
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2");
    }
  };

  // ------------------ CARREGAR LISTA ------------------
  const carregarMotoboys = async () => {
    try {
      const res = await fetch(`${API_URL}/motoboys`);
      const data = await res.json();
      setMotoboys(data);
    } catch (err) {
      console.error("❌ Erro ao carregar motoboys:", err);
    }
  };

  useEffect(() => {
    carregarMotoboys();
  }, []);

  // ------------------ VALIDAR NOME COMPLETO ------------------
  const nomeValido = () => {
    if (!novo.nome.trim()) return false;
    return novo.nome.trim().split(" ").length >= 2;
  };

  // ------------------ VALIDAR TELEFONE ------------------
  const telefoneValido = () => {
    const numeros = novo.telefone.replace(/\D/g, "");
    return numeros.length >= 10 && numeros.length <= 11;
  };

  const formularioValido = nomeValido() && telefoneValido();

  // ------------------ ADICIONAR ------------------
  const adicionarMotoboy = async () => {
    try {
      await fetch(`${API_URL}/motoboys`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novo),
      });

      setNovo({ nome: "", telefone: "" });
      carregarMotoboys();
    } catch (err) {
      console.error("❌ Erro ao adicionar motoboy:", err);
    }
  };

  return (
    <div>
      <h2>🏍️ Motoboys</h2>

      <div>
        <input
          placeholder="Nome completo"
          value={novo.nome}
          onChange={(e) => setNovo({ ...novo, nome: e.target.value })}
        />

        <input
          placeholder="Telefone"
          value={novo.telefone}
          onChange={(e) =>
            setNovo({ ...novo, telefone: formatarTelefone(e.target.value) })
          }
        />

        <button
          disabled={!formularioValido}
          onClick={adicionarMotoboy}
          style={{
            opacity: formularioValido ? 1 : 0.5,
            cursor: formularioValido ? "pointer" : "not-allowed",
          }}
        >
          Adicionar
        </button>
      </div>

      <ul>
        {motoboys.map((m) => (
          <li key={m._id}>
            <b>{m.nome}</b> — {m.telefone}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Motoboys;
