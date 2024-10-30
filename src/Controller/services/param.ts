import { PrismaClient, Parametro, Estacao } from "@prisma/client";

const prisma = new PrismaClient();

export const listarParametro = async():Promise<Parametro[]>=>{
    return prisma.parametro.findMany();
}

export const buscarParametro = async(cod_parametro:number):Promise<Parametro | null>=>{
    return prisma.parametro.findUnique({
        where: {cod_parametro},
    })
}

export const cadastrarParametro = async(cod_estacao:number, cod_tipoParametro: number, estacao: Estacao):Promise<Parametro>=>{
    return prisma.parametro.create({
        data:{cod_estacao, cod_tipoParametro},
    })
}

export const atualizarParametro = async(cod_parametro:number, cod_estacao:number, cod_tipoParametro: number):Promise<Parametro>=>{
    return prisma.parametro.update({
        where:{cod_parametro},
        data:{cod_estacao, cod_tipoParametro},
    })
}

export const deletarParametro = async(cod_parametro: number):Promise<Parametro>=>{
    return prisma.parametro.delete({
        where: {cod_parametro},
    })
}