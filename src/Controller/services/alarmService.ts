import { PrismaClient, Alarmes, Dados, Parametro } from "@prisma/client";
import { listarDado } from "./dataService";
import { cadastrarHistAlarme } from "./alarmHistory";

const prisma = new PrismaClient();


export const listarAlarme = async(): Promise<Alarmes[]> =>{
    return prisma.alarmes.findMany();
}

export const buscarAlarme = async(cod_alarme: number):Promise<Alarmes | null> =>{
    return prisma.alarmes.findUnique({
        where: {cod_alarme},
    });
}
export const cadastrarAlarme = async(nome: string, valor: number, condicao: string, cod_parametro: number):Promise<Alarmes>=>{
    valor = Math.round(valor * 100) / 100;
    return prisma.alarmes.create({
        data:{nome, valor, condicao, cod_parametro}
    })
}
export const atualizarAlarme = async(cod_alarme: number, nome: string, valor: number, condicao: string, cod_parametro: number):Promise<Alarmes>=>{
    valor = Math.round(valor * 100) / 100;
    return prisma.alarmes.update({
        where: {cod_alarme},
        data:{nome, valor, condicao, cod_parametro},
    })
}

export const deletarAlarme = async(cod_alarme:number):Promise<Alarmes>=>{
    return prisma.alarmes.delete({
        where:{cod_alarme},
    })
}

export const monitorarDados = async (cod_alarme: number, tempo: number, tipoTempo: 'Hora' | 'Minuto'): Promise<void> => {
    let intervalo: number = 60000; // intervalo de 1 minuto
  
    if (tipoTempo === 'Hora') {
      intervalo = (tempo * 60) * 60000;
    } else if (tipoTempo === 'Minuto') {
      intervalo = tempo * 60000;
    }
  
    await executarVerificacao(cod_alarme);

    setInterval(async () => {
        await executarVerificacao(cod_alarme); // Executa a verificação repetidamente
    }, intervalo);
};

export const executarVerificacao = async (cod_alarme: number): Promise<void> => {

    const alarme = await buscarAlarme(cod_alarme);
    if (!alarme) {
      console.log('Alarme não encontrado!');
      return;
    }
    console.log('Verificando alarme... (alarme: ' + alarme.nome + ')');
  
    const { condicao, valor: valorAlvo, cod_parametro } = alarme;
    const allDados: Array<Dados> = await listarDado();
    const dado = allDados.find(dado => dado.cod_parametro === cod_parametro);
  
    if (dado) {
      switch (condicao) {
        case 'Maior que':
          if (dado.Valor >= valorAlvo) {
            await cadastrarHistAlarme(dado.Valor, dado.unixtime, cod_alarme);
          } else {
            console.log('Não passou na verificação do alarme:', alarme.nome);
            return;
          };
          break;
        case 'Menor que':
            if (dado.Valor <= valorAlvo) {
                await cadastrarHistAlarme(dado.Valor, dado.unixtime, cod_alarme);
              } else {
                console.log('Não passou na verificação do alarme:', alarme.nome);
                return;
              };
          break;
        case 'igual a':
            if (dado.Valor == valorAlvo) {
                await cadastrarHistAlarme(dado.Valor, dado.unixtime, cod_alarme);
              } else {
                console.log('Não passou na verificação do alarme:', alarme.nome);
                return;
              };
          break;
        default:
          console.log('Condição inválida');
      }

    }
  };