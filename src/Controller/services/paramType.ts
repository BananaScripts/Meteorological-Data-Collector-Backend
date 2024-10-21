import { PrismaClient, TipoParametro} from "@prisma/client";

const prisma = new PrismaClient();

export const listarTipoParametro = async():Promise<TipoParametro[]>=>{
    return prisma.tipoParametro.findMany();
}

export const buscarTipoParametro = async(cod_tipoParametro: number):Promise<TipoParametro | null>=>{
    return prisma.tipoParametro.findUnique({
        where: {cod_tipoParametro}
    });
}

export const cadastrarTipoParametro = async(nome: string, fator: string, offset: string, unidadeMedida: string):Promise<TipoParametro>=>{
    return prisma.tipoParametro.create({
        data:{nome, fator, offset, unidadeMedida}
    });
}

export const atualizarTipoParametro = async(cod_tipoParametro:number, nome: string, fator: string, offset: string, unidadeMedida: string):Promise<TipoParametro>=>{
    return prisma.tipoParametro.update({
        where: {cod_tipoParametro},
        data:{nome, fator, offset, unidadeMedida}
    });
}

export const deletarTipoParametro = async(cod_tipoParametro: number):Promise<TipoParametro>=>{
    return prisma.tipoParametro.delete({
        where: {cod_tipoParametro}
    });
}