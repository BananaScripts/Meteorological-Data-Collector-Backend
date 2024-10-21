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



export const cadastrarEstacao = async(macAdress: string, nome: string, cidade: string, estado: string, numero: string, cep: number): Promise<Estacao> => {
    return prisma.estacao.create({
        data: {macAdress, nome, cidade, estado, numero: Number(numero), cep: cep.toString()},
    });
};


export const atualizarEstacao = async(cod_estacao: number, macAdress: string, nome: string, cidade: string, estado: string, numero: string, cep: number): Promise<Estacao> => {
    return prisma.estacao.update({
        where: {cod_estacao},
        data: {macAdress, nome, cidade, estado, numero: Number(numero), cep: cep.toString()},
    });
};

export const deletarEstacao = async(cod_estacao: number): Promise<Estacao>=>{
    return prisma.estacao.delete({
        where: {cod_estacao}
    })
}