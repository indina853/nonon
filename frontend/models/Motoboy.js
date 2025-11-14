import mongoose from "mongoose";

const MotoboySchema = new mongoose.Schema({
  nome: { type: String, required: true },
  telefone: { type: String, required: true },
  status: { type: String, default: "disponível" }
});

export default mongoose.model("Motoboy", MotoboySchema);
