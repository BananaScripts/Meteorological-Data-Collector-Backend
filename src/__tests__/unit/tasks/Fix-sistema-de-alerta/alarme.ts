const mockCreate = jest.fn();
const mockFindUnique = jest.fn();

// Mock da instância do Prisma Client
jest.mock('@prisma/client', () => ({
    PrismaClient: jest.fn().mockImplementation(() => ({
        alarmes: { create: mockCreate, findUnique: mockFindUnique },
        historicoAlarme: { create: mockCreate },
    })),
}));

import { buscarAlarme, cadastrarAlarme } from '../../../../Controller/services/alarmService';
import { cadastrarHistAlarme } from '../../../../Controller/services/alarmHistory';
import { executarVerificacao } from '../../../../Controller/services/alarmService';

// Mock da função buscarAlarme
jest.mock('../../../Controller/services/alarmService', () => ({
    ...jest.requireActual('../../../Controller/services/alarmService'),
    buscarAlarme: jest.fn(),
}));

const mockBuscarAlarme = buscarAlarme as jest.Mock;

describe('Funções de Verificação e Monitoramento', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Limpa o estado dos mocks antes de cada teste
    });

    it('Deve criar um alarme no banco de dados', async () => {
        const alarmeMock = { cod_alarme: 123, nome: 'Alarme Teste', valor: 100, condicao: 'Maior que', cod_parametro: 1 };

        mockCreate.mockResolvedValue(alarmeMock);

        const resultado = await cadastrarAlarme('Alarme Teste', 100, 'Maior que', 1);

        expect(mockCreate).toHaveBeenCalledWith({
            data: { nome: 'Alarme Teste', valor: 100, condicao: 'Maior que', cod_parametro: 1 },
        });
        expect(resultado).toEqual(alarmeMock);
    });

    it('Deve criar um histórico de alarme no banco de dados', async () => {
        const histAlarmeMock = { cod_historicoAlarme: 1, valor: 100, unixtime: 123456, cod_alarme: 1 };

        mockCreate.mockResolvedValue(histAlarmeMock);

        const resultado = await cadastrarHistAlarme(100, 123456, 1);

        expect(mockCreate).toHaveBeenCalledWith({
            data: { valor: 100, unixtime: 123456, cod_alarme: 1 },
        });
        expect(resultado).toEqual(histAlarmeMock);
    });

   
});
