import { PrismaClient, Alarmes, Dados } from "@prisma/client";
import { listarDado } from "./dataService";

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

export const monitorarDados = async(valorAlvo: number, condicao: 'maior' | 'menor', parametro: number):Promise<void>=>{
    const intervalo = 60000; // 1 minuto

    await executarVerificacao(valorAlvo, condicao, parametro)

    const timer = setInterval(async()=>{
        await executarVerificacao(valorAlvo, condicao, parametro)
    }, intervalo)
}

const executarVerificacao = async(valorAlvo: number, condicao: 'maior' | 'menor', parametro: number)=>{
    let dados:Array<Dados> = await listarDado();
    for(let dado of dados){
        if(condicao === 'maior' && dado.Valor > valorAlvo){
            await cadastrarAlarme('', dado.Valor.toString(), 'maior que', parametro)
        }
        else if(condicao === 'menor' && dado.Valor < valorAlvo){
            await cadastrarAlarme('Alarme1', dado.Valor.toString(), 'menor que', parametro)
        }
    }
}