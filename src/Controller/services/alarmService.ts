import { PrismaClient, Alarmes, Dados, Parametro } from "@prisma/client";
import { listarDado } from "./dataService";
import { buscarParametro } from "./param";
import { buscarTipoParametro } from "./paramType";
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
export const cadastrarAlarme = async(nome: string, valor: string, condicao: string, cod_parametro: number):Promise<Alarmes>=>{
    return prisma.alarmes.create({
        data:{nome, valor, condicao, cod_parametro}
    })
}
export const atualizarAlarme = async(cod_alarme: number, nome: string, valor: string, condicao: string, cod_parametro: number):Promise<Alarmes>=>{
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

export const monitorarDados = async(nome: string, valorAlvo: number, condicao: 'maior' | 'menor' | 'igual a', cod_parametro: number, cod_tipoParametro: number, tempo: number, tipoTempo: string, cod_estacao:number):Promise<void>=>{
    let intervalo:number = 60000; // intervalo de 1 minuto

    if(tipoTempo === 'Hora'){
        intervalo = (tempo * 60) * 60000   
    }
    else if (tipoTempo === 'Minuto'){
        intervalo = tempo * 60000
    }

    await executarVerificacao(nome, valorAlvo, condicao, cod_parametro, cod_tipoParametro, cod_estacao)

    setInterval(async()=>{
        await executarVerificacao(nome, valorAlvo, condicao, cod_parametro, cod_tipoParametro, cod_estacao)
    }, intervalo)
}

export const executarVerificacao = async(nome: string, valorAlvo: number, condicao: 'maior' | 'menor' | 'igual a', cod_parametro: number, cod_tipoParametro: number, cod_estacao: number)=>{
    const dados:Array<Dados> = await listarDado();
    const parametro = await buscarParametro(cod_parametro)

    for(let dado of dados){
        if(parametro?.cod_tipoParametro === cod_tipoParametro && parametro?.cod_parametro === dado.cod_parametro && parametro?.cod_estacao === cod_estacao){
            if(condicao === 'maior' && dado.Valor > valorAlvo){
                let alarme = await cadastrarAlarme(nome, dado.Valor.toString(), 'maior que', cod_parametro)
                await cadastrarHistAlarme(valorAlvo.toString(), Math.floor(Date.now() / 1000), alarme.cod_alarme)
            }
            else if(condicao === 'menor' && dado.Valor < valorAlvo){
                let alarme = await cadastrarAlarme(nome, dado.Valor.toString(), 'menor que', cod_parametro)
                await cadastrarHistAlarme(valorAlvo.toString(), Math.floor(Date.now() / 1000), alarme.cod_alarme)
            }
            else if(condicao === 'igual a' && dado.Valor == valorAlvo){
                let alarme = await cadastrarAlarme(nome, dado.Valor.toString(), 'igual a', cod_parametro)
                await cadastrarHistAlarme(valorAlvo.toString(), Math.floor(Date.now() / 1000), alarme.cod_alarme)
            }
        }
    }
}