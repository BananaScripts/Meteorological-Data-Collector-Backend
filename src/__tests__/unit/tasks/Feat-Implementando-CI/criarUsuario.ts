import { Request, Response } from 'express';
import { cadastrarUsuarios } from '../../../../Controller/controllers/userController';
import { cadastrarUsuario } from '../../../Controller/services/userService';

// Mocks das funções externas
jest.mock('../../../Controller/services/userService');
const cadastrarUsuarioMock = cadastrarUsuario as jest.Mock;

describe('cadastrarUsuarios', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let sendMock: jest.Mock;
    let statusMock: jest.Mock;

    beforeEach(() => {
        req = {
            body: {
                nome: 'Teste Nome',
                dataNascimento: '2000-01-01',
                cpf: '12345678900',
                email: 'teste@teste.com',
                senha: 'senha123'
            }
        };
        
        sendMock = jest.fn();
        statusMock = jest.fn().mockReturnThis();

        res = {
            status: statusMock,
            send: sendMock
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('deve retornar status 201 e mensagem de sucesso ao cadastrar usuário com sucesso', async () => {
        cadastrarUsuarioMock.mockResolvedValueOnce({}); // Suponha que retorne um objeto de usuário vazio para simular a criação

        await cadastrarUsuarios(req as Request, res as Response);

        expect(statusMock).toHaveBeenCalledWith(201);
        expect(sendMock).toHaveBeenCalledWith("Usuário cadastrado com sucesso!");
    });

    it('deve retornar status 500 e mensagem de erro quando ocorrer uma exceção', async () => {
        cadastrarUsuarioMock.mockRejectedValueOnce(new Error("Erro ao cadastrar"));

        await cadastrarUsuarios(req as Request, res as Response);

        expect(statusMock).toHaveBeenCalledWith(500);
        expect(sendMock).toHaveBeenCalledWith("Erro ao cadastrar usuário.");
    });
});
