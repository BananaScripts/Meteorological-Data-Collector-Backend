import { PrismaClient, Estacao } from "@prisma/client";

const prisma = new PrismaClient();

export const listarEstacao = async (): Promise<Estacao[]> => {
    return prisma.estacao.findMany();
};

export const buscarEstacao = async (cod_estacao: number): Promise<Estacao | null> => {
    return prisma.estacao.findUnique({
        where: {cod_estacao},
    });
}

/* Revisar "Parametro[]" */
export const cadastrarEstacao = async(macAdress: string, nome: string, cidade: string, estado: string, numero: number, cep: number): Promise<Estacao> =>{
    return prisma.estacao.create({
        data: {macAdress, nome, cidade, estado, numero, cep},
    })
}
/* Revisar "Parametro[]" */
export const atualizarEstacao = async(cod_estacao:number, macAdress: string, nome: string, cidade: string, estado: string, numero: number, cep: number): Promise<Estacao> =>{
    return prisma.estacao.update({
        where: {cod_estacao},
        data: {macAdress, nome, cidade, estado, numero, cep},
    })
}

export const deletarEstacao = async(cod_estacao: number): Promise<Estacao>=>{
    return prisma.estacao.delete({
        where: {cod_estacao}
    })
}