import { loginUsuario } from "../../../../Controller/controllers/loginController";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

// Mock do JWT
jest.mock("jsonwebtoken");

// Mock do Prisma
jest.mock('@prisma/client', () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => ({
      usuario: {
        findUnique: jest.fn(),  // Mock da função findUnique
      },
    })),
  };
});

describe("loginUsuario", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      body: { cpf: "12345678900", senha: "senha123" },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    };

    next = jest.fn();
    jest.clearAllMocks();
  });

  

  it("deve retornar 401 se a senha estiver incorreta", async () => {
    const mockFindUnique = new (require('@prisma/client').PrismaClient)().usuario.findUnique;
    mockFindUnique.mockResolvedValue({ cpf: "12345678900", senha: "senhaCorreta" });

    await loginUsuario(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith("Senha incorreta");
  });

  
});
