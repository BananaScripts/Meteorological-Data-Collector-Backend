import { PrismaClient, Alarmes } from "@prisma/client";

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