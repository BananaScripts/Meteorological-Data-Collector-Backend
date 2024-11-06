import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const GetSupabase = async () => {
    try {
        
        const estacoesComRelacionamentos = await prisma.estacao.findMany({
            include: {
                parametros: {
                    include: {
                        tipoParametro: true,
                    },
                },
            },
        });

        // Estruturar os dados no formato desejado para retorno
        const resultado = estacoesComRelacionamentos.map(estacao => ({
            cod_estacao: estacao.cod_estacao,
            nome_estacao: estacao.nome,
            parametros: estacao.parametros.map(parametro => ({
                cod_parametro: parametro.cod_parametro,
                cod_tipoParametro: parametro.cod_tipoParametro,
                tipoParametroNome: parametro.tipoParametro.nome,
                fator: parametro.tipoParametro.fator,
                offset: parametro.tipoParametro.offset,
                unidadeMedida: parametro.tipoParametro.unidadeMedida,
                json: parametro.tipoParametro.json,
            })),
        }));

        return resultado;
    } catch (error) {
        console.error("Erro ao pegar estações e parâmetros:", error);
        return [];
    } finally {
        await prisma.$disconnect(); 
    }
};


GetSupabase()
    .then(resultado => {
        console.log("Resultado:", JSON.stringify(resultado, null, 2));
    })
    .catch(error => console.error("Erro ao pegar estações e parâmetros:", error));
