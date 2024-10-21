import { Request, Response } from 'express';
import { cadastrarUsuarios } from '../../../Controller/controles/userController';
import { cadastrarUsuario } from '../../../Controller/services/userService'; // Função mockada

jest.mock('../../../Controller/services/userService', () => ({
    cadastrarUsuario: jest.fn(),
}));

describe('cadastrarUsuarios', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let statusMock: jest.Mock;
    let sendMock: jest.Mock;

    beforeEach(() => {
        req = {
            body: {
                nome: 'John Doe',
                dataNascimento: '1990-01-01',
                cpf: '12345678900',
                email: 'johndoe@example.com',
                senha: 'password123',
            },
        };
        // Cria função mock
        sendMock = jest.fn();
        statusMock = jest.fn().mockReturnValue({ send: sendMock });

        res = {
            status: statusMock,
        };
    });

    it('deve cadastrar o usuário com sucesso e retornar status 201', async () => {
        (cadastrarUsuario as jest.Mock).mockResolvedValue({});

        await cadastrarUsuarios(req as Request, res as Response);

        expect(cadastrarUsuario).toHaveBeenCalledWith(
            'John Doe',
            '1990-01-01',
            '12345678900',
            'johndoe@example.com',
            'password123'
        );

        expect(statusMock).toHaveBeenCalledWith(201);
        expect(sendMock).toHaveBeenCalledWith('Usuário cadastrado com sucesso!');
    });

    it('deve retornar status 500 quando ocorrer um erro ao cadastrar o usuário', async () => {
        (cadastrarUsuario as jest.Mock).mockRejectedValue(new Error('Erro ao cadastrar'));

        await cadastrarUsuarios(req as Request, res as Response);

        expect(statusMock).toHaveBeenCalledWith(500);
        expect(sendMock).toHaveBeenCalledWith('Erro ao cadastrar usuário.');
    });

    it('deve retornar status 400 se algum campo obrigatório estiver faltando', async () => {
        req.body = {
            nome: 'John Doe',
            dataNascimento: '1990-01-01',
            cpf: '12345678900',
            senha: 'password123'
        };

        await cadastrarUsuarios(req as Request, res as Response);

        expect(statusMock).toHaveBeenCalledWith(500);
        expect(sendMock).toHaveBeenCalledWith('Erro ao cadastrar usuário.');
    });

});
