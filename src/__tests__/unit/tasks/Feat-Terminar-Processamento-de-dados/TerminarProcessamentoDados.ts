import { PrismaClient } from '@prisma/client';
import connectToDatabaseMongo from '../../../../Kepper/services/mongoConnect';
import { migrarDadosMongoParaSupabase } from '../../../../Kepper/app';
import { MongoClient } from 'mongodb';
import { GetSupabase } from '../../../../Kepper/services/suapabaseConnect';


jest.mock('@prisma/client');
jest.mock('./services/mongoConnect');

const prisma = new PrismaClient();

describe('migrarDadosMongoParaSupabase', () => {
    let mockCollection: any;

    beforeAll(() => {
        mockCollection = {
            countDocuments: jest.fn(),
            find: jest.fn().mockReturnThis(),
            sort: jest.fn().mockReturnThis(),
            limit: jest.fn().mockReturnThis(),
            toArray: jest.fn(),
            deleteOne: jest.fn(),
        };
        (connectToDatabaseMongo as jest.Mock).mockResolvedValue(mockCollection);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('deve retornar se não houver dados no MongoDB', async () => {
        mockCollection.countDocuments.mockResolvedValue(0);

        await migrarDadosMongoParaSupabase();

        expect(mockCollection.countDocuments).toHaveBeenCalled();
        expect(prisma.estacao.findMany).not.toHaveBeenCalled();
    });

    it('deve registrar um erro caso falhe a migração de dados', async () => {
        mockCollection.countDocuments.mockResolvedValue(1);
        mockCollection.toArray.mockResolvedValue([{ uid: 'invalidUID' }]);
        (prisma.estacao.findMany as jest.Mock).mockRejectedValue(new Error('Erro ao buscar estações'));

        console.error = jest.fn();

        await migrarDadosMongoParaSupabase();

        expect(console.error).toHaveBeenCalledWith(expect.stringContaining('Erro ao migrar dados'));
    });
});



jest.mock('mongodb');

describe('connectToDatabaseMongo', () => {
    it('deve conectar ao MongoDB e retornar a coleção correta', async () => {
        const mockDb = { collection: jest.fn().mockReturnValue('mockCollection') };
        const mockClient = { connect: jest.fn(), db: jest.fn().mockReturnValue(mockDb) };
        (MongoClient as unknown as jest.Mock).mockImplementation(() => mockClient);

        const collection = await connectToDatabaseMongo();

        expect(mockClient.connect).toHaveBeenCalled();
        expect(mockDb.collection).toHaveBeenCalledWith(process.env.COLLECTION || 'Data');
        expect(collection).toBe('mockCollection');
    });
});


jest.mock('@prisma/client');


describe('GetSupabase', () => {
    it('deve retornar estações com parâmetros estruturados', async () => {
        (prisma.estacao.findMany as jest.Mock).mockResolvedValue([
            {
                cod_estacao: 1,
                nome: 'Estacao 1',
                parametros: [
                    {
                        cod_parametro: 101,
                        cod_tipoParametro: 201,
                        tipoParametro: {
                            nome: 'Temperatura',
                            fator: 1,
                            offset: 0,
                            unidadeMedida: 'C',
                            json: 'temp',
                        },
                    },
                ],
            },
        ]);

        const resultado = await GetSupabase();

        expect(resultado).toEqual([
            {
                cod_estacao: 1,
                nome_estacao: 'Estacao 1',
                parametros: [
                    {
                        cod_parametro: 101,
                        cod_tipoParametro: 201,
                        tipoParametroNome: 'Temperatura',
                        fator: 1,
                        offset: 0,
                        unidadeMedida: 'C',
                        json: 'temp',
                    },
                ],
            },
        ]);
    });

    it('deve retornar um array vazio em caso de erro', async () => {
        (prisma.estacao.findMany as jest.Mock).mockRejectedValue(new Error('Erro ao buscar dados'));

        const resultado = await GetSupabase();

        expect(resultado).toEqual([]);
    });
});
