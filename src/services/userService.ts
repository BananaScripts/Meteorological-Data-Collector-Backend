import { PrismaClient, } from "@prisma/client";

const prisma = new PrismaClient();

export const listarUsuario = async () =>{
    return prisma.usuario.findMany();
}

export const buscarUsuario = async (cod_usuario: number) =>{
    return prisma.usuario.findUnique({
        where: {cod_usuario},
    });
}

export const cadastrarUsuario = async (nome: string, dataNascimento: string, cpf: string, email:string, senha: string)=>{
    return prisma.usuario.create({
        data: {nome, dataNascimento, cpf, email, senha},
    })
}

export const atualizarUsuario = async (cod_usuario: number, nome: string, dataNascimento: string, cpf: string, email:string, senha: string )=>{
    return prisma.usuario.update({
        where: {cod_usuario},
        data: {nome, dataNascimento, cpf, email, senha},
    })
}

export const deletarUsuario = async (cod_usuario: number) =>{
    return prisma.usuario.delete({
        where: {cod_usuario}
    })
}