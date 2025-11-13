import express from "express";
import Pedido from "../models/Pedido.js";

const router = express.Router();

// 📦 Criar novo pedido
router.post("/", async (req, res) => {
  try {
    const novoPedido = new Pedido(req.body);
    await novoPedido.save();
    res.status(201).json(novoPedido);
  } catch (err) {
    console.error("❌ Erro ao criar pedido:", err);
    res.status(500).json({ erro: "Erro ao criar pedido" });
  }
});

// 🔄 Listar todos os pedidos
router.get("/", async (req, res) => {
  try {
    const pedidos = await Pedido.find();
    res.json(pedidos);
  } catch (err) {
    console.error("❌ Erro ao buscar pedidos:", err);
    res.status(500).json({ erro: "Erro ao buscar pedidos" });
  }
});

export default router;
