import mongoose from "mongoose";

const pedidoSchema = new mongoose.Schema({
  cliente: { type: String, required: true },
  item: { type: String, required: true },
  status: { type: String, default: "Pendente" },
}, { timestamps: true });

export default mongoose.model("Pedido", pedidoSchema);
