import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Não Autorizado - Token Não Provido" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res
        .status(401)
        .json({ message: "Não Autorizado - Token Inválido" });
    }

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Erro na proteção de rota do middleware", error.message);
    res.status(500).json({ message: "Erro Interno do Servidor" });
  }
};
