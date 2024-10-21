import { Request, Response } from 'express';
import { buscarUsuarios } from '../../../Controller/controles/userController';
import { buscarUsuario } from '../../../Controller/services/userService';

// Mock da função buscarUsuario
jest.mock('../../../Controller/services/userService', () => ({
  buscarUsuario: jest.fn(),
}));

describe('buscarUsuarios', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let statusMock: jest.Mock;
  let jsonMock: jest.Mock;
  let sendMock: jest.Mock;

  beforeEach(() => {
    req = {
      params: {
        cod_usuario: '1',
      },
    };

    jsonMock = jest.fn();
    sendMock = jest.fn();
    statusMock = jest.fn().mockReturnValue({ json: jsonMock, send: sendMock });

    res = {
      status: statusMock,
    };
  });

  it('deve retornar status 302 e o usuário quando encontrado', async () => {
    const usuarioMock = {
      cod_usuario: 1,
      nome: 'John Doe',
      email: 'johndoe@example.com',
    };
    (buscarUsuario as jest.Mock).mockResolvedValue(usuarioMock);

    await buscarUsuarios(req as Request, res as Response);

    expect(buscarUsuario).toHaveBeenCalledWith(1);

    expect(statusMock).toHaveBeenCalledWith(302);
    expect(jsonMock).toHaveBeenCalledWith(usuarioMock);
  });

  it('deve retornar status 404 quando o usuário não for encontrado', async () => {
    (buscarUsuario as jest.Mock).mockResolvedValue(null);

    await buscarUsuarios(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(404);
    expect(sendMock).toHaveBeenCalledWith('Usuário não encontrado.');
  });

  it('deve retornar status 500 quando ocorrer um erro ao buscar o usuário', async () => {
    (buscarUsuario as jest.Mock).mockRejectedValue(new Error('Erro de banco de dados'));

    await buscarUsuarios(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(500);
    expect(sendMock).toHaveBeenCalledWith('Erro ao buscar usuário.');
  });
});
