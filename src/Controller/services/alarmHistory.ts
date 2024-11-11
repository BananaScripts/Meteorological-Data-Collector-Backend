import { PrismaClient, HistoricoAlarme } from "@prisma/client";

const prisma = new PrismaClient();

export const listarHistAlarme = async():Promise<HistoricoAlarme[]>=>{
    return prisma.historicoAlarme.findMany();
}

export const buscarHistAlarme = async(cod_historicoAlarme: number):Promise<HistoricoAlarme | null>=>{
    return prisma.historicoAlarme.findUnique({
        where: {cod_historicoAlarme},
    });
}

export const cadastrarHistAlarme = async(valor: string, unixtime: number, cod_alarme: number):Promise<HistoricoAlarme>=>{
    return prisma.historicoAlarme.create({
        data:{valor, unixtime, cod_alarme}
    });
}

export const atualizarHistAlarme = async(cod_historicoAlarme:number, valor: string, unixtime: number, hora: string, cod_alarme: number):Promise<HistoricoAlarme>=>{
    return prisma.historicoAlarme.update({
        where:{cod_historicoAlarme},
        data:{valor, unixtime, cod_alarme}
    });
}

export const deletarHistAlarme = async(cod_historicoAlarme: number):Promise<HistoricoAlarme>=>{
    return prisma.historicoAlarme.delete({
        where:{cod_historicoAlarme},
    });
}