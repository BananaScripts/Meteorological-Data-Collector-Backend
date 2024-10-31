import { PrismaClient, Dados } from "@prisma/client";

const prisma = new PrismaClient();

export const listarDado = async():Promise<Dados[]> =>{
    return prisma.dados.findMany();
}

export const buscarDado = async(cod_dados: number):Promise<Dados | null> =>{
    return prisma.dados.findUnique({
        where:{cod_dados}
    })
}

export const cadastrarDado = async(cod_parametro: number, Valor: number, unixtime: number):Promise<Dados> =>{
    return prisma.dados.create({
        data: {cod_parametro, Valor, unixtime}
    })
}

export const atualizarDado = async(cod_dados:number, cod_parametro:number):Promise<Dados> =>{
    return prisma.dados.update({
        where: {cod_dados},
        data: {cod_parametro},
    })
}

export const deletarDado = async(cod_dados: number):Promise<Dados> =>{
    return prisma.dados.delete({
        where: {cod_dados}
    })
}