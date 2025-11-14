import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import motoboyRoutes from "./routes/motoboys.js";
import pedidoRoutes from "./routes/pedidos.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Conexão MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado ao MongoDB Atlas"))
  .catch(err => console.error("❌ Erro MongoDB:", err));

// Rotas
app.use("/motoboys", motoboyRoutes);
app.use("/pedidos", pedidoRoutes);
app.use("/auth", authRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));

app.get("/", (req, res) => {
  res.send("🚀 API do sistema de motoboys está rodando!");
});
