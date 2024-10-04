import { PrismaClient, Dados } from "@prisma/client";

const prisma = new PrismaClient();

export const ListarDado = async():Promise<Dados[]> =>{
    return prisma.dados.findMany();
}

export const buscarDado = async(cod_dados: number):Promise<Dados | null> =>{
    return prisma.dados.findUnique({
        where:{cod_dados}
    })
}

/* Revisar dados que devem ser cadastrados */
export const cadastrarDado = async(cod_parametro: number):Promise<Dados> =>{
    return prisma.dados.create({
        data: {cod_parametro}
    })
}

/* Revisar dados que podem ser atualizados */
export const atualizarEstacaoDado = async(cod_dados:number, cod_parametro:number):Promise<Dados> =>{
    return prisma.dados.update({
        where: {cod_dados},
        data: {cod_parametro},
    })
}

export const deleteDado = async(cod_dados: number):Promise<Dados> =>{
    return prisma.dados.delete({
        where: {cod_dados}
    })
}