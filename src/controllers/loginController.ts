import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


const prisma = new PrismaClient();

export const verificarToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.body.token;
    const tokenValido = jwt.verify(token ?? "", process.env.JWT_PASS ?? "");
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
      where: {
        email: req.body.email,
      },
    });
    if (!usuario) {
      res.status(404).json({ msg: "Usuário não encontrado" });
    }
    const senhaDoPrisma = prisma.usuario.senha   
    const senha = req.body.senhaUsuario;
    if (senhaDoPrisma != senha) {
      res.status(401).json({ msg: "Senha incorreta" });
    }

    const token = jwt.sign(
      {
        usuario: usuario,
      },
        process.env.JWT_PASS ?? "",
        {
          expiresIn: "8h",
        },
      );

      res.status(202).json({
        msg: "Usuário logado com sucesso",
        token:token
      });
    
  } catch (error) {
    next(error);
  }
};