import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken"


const prisma = new PrismaClient();

export const verificarToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.body.token;
    const tokenValido = jwt.verify(token ?? "", process.env.JWTPASS ?? "");
    if (tokenValido) {
      res.status(202).json({ msg: "Token válido", tokenValido });
    }
    next();
  } catch (error) {
    next(error);
  }
};

export const loginUsuario = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const usuario = await prisma.usuario.findUnique({
      where: {cpf:req.body.cpf},
    });
    if (!usuario) {
      res.status(404).send("Usuario não encontrado");
    }
    const usuarioSenha = usuario?.senha;
    const senha = req.body.senha;
    if (usuarioSenha != senha) {
      res.status(401).json({ msg: "Senha incorreta" });
    }
    else {
      const token = jwt.sign(
        {
          usuario: usuario,
        },
        process.env.JWTPASS || "default_secret",
        {
          expiresIn: "8h",
        },
      );
      res.status(202).json({
        msg: "Usuário logado com sucesso",
        usuario: usuario,
        token: token
        
      });
    }
  } catch (error) {
    next(error);
  }
};