import { executarVerificacao, monitorarDados, cadastrarAlarme } from '../../../Controller/services/alarmService';
import { cadastrarHistAlarme } from '../../../Controller/services/alarmHistory';
import { listarDado } from '../../../Controller/services/dataService';
import { buscarParametro } from '../../../Controller/services/param';
import { PrismaClient } from '@prisma/client';

jest.mock('../../../Controller/services/alarmService');
jest.mock('../../../Controller/services/alarmHistory');
jest.mock('../../../Controller/services/dataService');
jest.mock('../../../Controller/services/param');
jest.mock('@prisma/client');

const prisma = new PrismaClient();
jest.mocked(prisma.alarmes.create).mockResolvedValue({
    cod_alarme: 123,
    nome: 'Alarme Teste',
    valor: '100',
    condicao: 'maior que',
    cod_parametro: 1
});

beforeEach(() => {
    jest.clearAllMocks();
});

describe('Funções de Verificação e Monitoramento', () => {

    describe('executarVerificacao', () => {

        it('Deve cadastrar alarme quando a condição for "maior"', async () => {
            
            const dadosMock = [{ cod_parametro: 1, Valor: 100 }];
            const parametroMock = { cod_tipoParametro: 1, cod_parametro: 1 };
 
            (listarDado as jest.Mock).mockResolvedValue(dadosMock);
            (buscarParametro as jest.Mock).mockResolvedValue(parametroMock);

            const cadastrarAlarmeMock = jest.fn().mockResolvedValue({ cod_alarme: 123 });
            const cadastrarHistAlarmeMock = jest.fn().mockResolvedValue({});
            
            (cadastrarAlarme as jest.Mock).mockImplementation(cadastrarAlarmeMock);
            (cadastrarHistAlarme as jest.Mock).mockImplementation(cadastrarHistAlarmeMock);

            await executarVerificacao('Alarme Maior', 50, 'maior', 1, 1);

            expect(cadastrarAlarmeMock).toHaveBeenCalledWith('Alarme Maior', '100', 'maior que', 1);
            expect(cadastrarHistAlarmeMock).toHaveBeenCalledWith('50', expect.any(Number), 123);
        });

        it('Não deve cadastrar alarme quando a condição não for atendida', async () => {
            const dadosMock = [{ cod_parametro: 1, Valor: 20 }];
            const parametroMock = { cod_tipoParametro: 1, cod_parametro: 1 };

            (listarDado as jest.Mock).mockResolvedValue(dadosMock);
            (buscarParametro as jest.Mock).mockResolvedValue(parametroMock);
            
            await executarVerificacao('Alarme Maior', 50, 'maior', 1, 1);
            
            expect(cadastrarAlarme).not.toHaveBeenCalled();
            expect(cadastrarHistAlarme).not.toHaveBeenCalled();
        });
    });

    describe('monitorarDados', () => {

        it('Deve chamar executarVerificacao após o intervalo', async () => {
            jest.useFakeTimers();
            const executarVerificacaoMock = jest.fn();

            (executarVerificacao as jest.Mock).mockResolvedValue(undefined);
            
            await monitorarDados('Alarme', 50, 'maior', 1, 1, 1, 'Minuto');
            
            jest.advanceTimersByTime(60000);
            
            expect(executarVerificacaoMock).toHaveBeenCalledTimes(2);
        });
    });

    describe('cadastrarAlarme', () => {

        it('Deve criar um alarme no banco de dados', async () => {
            const alarmeMock = { cod_alarme: 123 };

            (prisma.alarmes.create as jest.Mock).mockResolvedValue(alarmeMock);

            const resultado = await cadastrarAlarme('Alarme Teste', '100', 'maior que', 1);

            expect(prisma.alarmes.create).toHaveBeenCalledWith({
                data: { nome: 'Alarme Teste', valor: '100', condicao: 'maior que', cod_parametro: 1 }
            });
            expect(resultado).toEqual(alarmeMock);
        });
    });

    describe('cadastrarHistAlarme', () => {

        it('Deve criar um histórico de alarme no banco de dados', async () => {
            const histAlarmeMock = {};

            (prisma.historicoAlarme.create as jest.Mock).mockResolvedValue(histAlarmeMock);

            const resultado = await cadastrarHistAlarme('100', 1234567890, 123);

            expect(prisma.historicoAlarme.create).toHaveBeenCalledWith({
                data: { valor: '100', unixtime: 1234567890, cod_alarme: 123 }
            });
            expect(resultado).toEqual(histAlarmeMock);
        });
    });
});
