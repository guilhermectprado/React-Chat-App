import { generateToken } from "../lib/token.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  const { email, fullName, password } = req.body;

  try {
    if (!fullName || !email || !password) {
      return res
        .status(400)
        .json({ message: "Todos os campos são obrigatórios" });
    }

    const emailExist = await User.findOne({ email });
    if (emailExist) {
      return res.status(400).json({ message: "E-mail já cadastrado" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Senha deve conter ao menos 8 caracteres" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      fullName,
      password: hashedPassword,
    });

    if (newUser) {
      generateToken(newUser._id, res);

      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        email: newUser.email,
        fullName: newUser.fullName,
        profileImage: newUser.profileImage,
        createdAt: newUser.createdAt,
      });
    } else {
      res.status(400).json({ message: "Dados Inválidos" });
    }
  } catch (error) {
    console.log("Erro na Controladora Auth (signup)", error.message);
    res.status(500).json({ message: "Erro Interno do Servidor" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Usuário não encontrado" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Senha incorreta" });
    }

    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      email: user.email,
      fullName: user.fullName,
      profileImage: user.profileImage,
      createdAt: user.createdAt,
    });
  } catch (error) {
    console.log("Erro na Controladora Auth (login)", error.message);
    res.status(500).json({ message: "Erro Interno do Servidor" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Deslogado com sucesso" });
  } catch (error) {
    console.log("Erro na Controladora Auth (logout)", error.message);
    res.status(500).json({ message: "Erro Interno do Servidor" });
  }
};

export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Erro na Controladora Auth (checkAuth)", error.message);
    res.status(500).json({ message: "Erro Interno do Servidor" });
  }
};
