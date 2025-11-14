import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// ------------------- LOGIN -------------------
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Usuário não encontrado" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Senha incorreta" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.json({ token });
});

// ------------------- CADASTRO -------------------
router.post("/register", async (req, res) => {
  const { fullName, email, password, phone } = req.body;

  if (!fullName || !fullName.includes(" ")) {
    return res
      .status(400)
      .json({ message: "Digite seu nome completo (nome e sobrenome)." });
  }

  if (!phone) {
    return res.status(400).json({ message: "Digite um número de telefone." });
  }

  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: "Email já cadastrado" });

  const hashed = await bcrypt.hash(password, 10);

  // Gerar username automático
  const [firstName, lastName] = fullName.toLowerCase().split(" ");
  const random = Math.floor(100 + Math.random() * 900);
  const username = `${firstName}.${lastName}_${random}`;

  const newUser = await User.create({
    fullName,
    email,
    password: hashed,
    phone,
    username
  });

  res.json({
    message: "Conta criada!",
    usernameGerado: username
  });
});

// ------------------- PEGAR DADOS DO USUÁRIO -------------------
router.get("/me", authMiddleware, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
});

// ------------------- ATUALIZAR PERFIL -------------------
router.put("/update", authMiddleware, async (req, res) => {
  const { fullName, email, phone } = req.body;

  const updated = await User.findByIdAndUpdate(
    req.user.id,
    { fullName, email, phone },
    { new: true }
  ).select("-password");

  res.json({ message: "Perfil atualizado", user: updated });
});

// ------------------- ALTERAR SENHA -------------------
router.put("/password", authMiddleware, async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.user.id);
  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch)
    return res.status(400).json({ message: "Senha atual incorreta" });

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  res.json({ message: "Senha alterada!" });
});

/// ------------------- EXCLUIR CONTA -------------------
router.delete("/delete", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    const deleted = await User.findByIdAndDelete(userId);

    if (!deleted) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    res.json({ message: "Conta excluída com sucesso" });
  } catch (err) {
    res.status(500).json({ message: "Erro ao excluir conta" });
  }
});


export default router;
