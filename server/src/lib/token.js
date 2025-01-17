import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // expires in em milisegundos
    httpOnly: true, // Prevenir ataques XSS de script entre sites
    sameSite: "strict", // Ataques CSRF de falsificação de solicitação entre sites
    secure: process.env.NODE_ENV !== "development",
  });

  return token;
};
