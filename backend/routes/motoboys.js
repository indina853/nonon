import express from "express";
import Motoboy from "../models/Motoboy.js";

const router = express.Router();

// Listar motoboys
router.get("/", async (req, res) => {
  try {
    const lista = await Motoboy.find();
    res.json(lista);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao buscar motoboys" });
  }
});

// Adicionar motoboy
router.post("/", async (req, res) => {
  try {
    const novo = await Motoboy.create(req.body);
    res.status(201).json(novo);
  } catch (err) {
    res.status(400).json({ erro: "Erro ao adicionar motoboy" });
  }
});

// Atualizar status
router.put("/:id", async (req, res) => {
  try {
    const atualizado = await Motoboy.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(atualizado);
  } catch (err) {
    res.status(400).json({ erro: "Erro ao atualizar motoboy" });
  }
});

// Remover motoboy
router.delete("/:id", async (req, res) => {
  try {
    await Motoboy.findByIdAndDelete(req.params.id);
    res.json({ mensagem: "Motoboy removido" });
  } catch (err) {
    res.status(400).json({ erro: "Erro ao remover motoboy" });
  }
});

export default router;
