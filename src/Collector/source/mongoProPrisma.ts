import { PrismaClient } from '@prisma/client';
import { connectToDatabase } from "../mongodb";

const prisma = new PrismaClient();

async function mongoProPrisma() {
    try {
        const db = await connectToDatabase();
        const collection = db.collection('Data');

        const mongoData = await collection.find({}).toArray();
        console.log('Dados do MongoDB:', mongoData);

        for (const item of mongoData) {
            let estacao = await prisma.estacao.findUnique({
                where: { macAdress: item.uid }
            });

            if (!estacao) {
                estacao = await prisma.estacao.create({
                    data: {
                        macAdress: item.uid,
                        nome: "Nome Padrão",
                        cidade: "Cidade Padrão",
                        estado: "Estado Padrão",
                        numero: 0,
                        cep: "00000-000"
                    }
                });
            }

            const parametros = [
                { tipo: 'Chuva', valor: item.plu },
                { tipo: 'Umidade', valor: item.umi },
                { tipo: 'Temperatura', valor: item.tem },
                { tipo: 'Pressao', valor: item.prs },
            ];

            for (const param of parametros) {
                const tipoParametro = await prisma.tipoParametro.findFirst({
                    where: { nome: param.tipo }
                });

                if (tipoParametro) {
                    let parametro = await prisma.parametro.findFirst({
                        where: {
                            cod_estacao: estacao.cod_estacao,
                            cod_tipoParametro: tipoParametro.cod_tipoParametro,
                        }
                    });

                    if (!parametro) {
                        parametro = await prisma.parametro.create({
                            data: {
                                estacao: {
                                    connect: { cod_estacao: estacao.cod_estacao }
                                },
                                tipoParametro: {
                                    connect: { cod_tipoParametro: tipoParametro.cod_tipoParametro }
                                }
                            }
                        });
                    }

                    console.log(`Inserindo dados para ${param.tipo}:`, param.valor);

                    await prisma.dados.create({
                        data: {
                            cod_parametro: parametro.cod_parametro,
                            Valor: param.valor,
                            unixtime: item.uxt
                        }
                    });
                } else {
                    console.error(`Tipo de parâmetro não encontrado: ${param.tipo}`);
                }
            }
        }

        console.log('Dados sincronizados com sucesso!');
    } catch (e) {
        console.error('Erro ao sincronizar dados:', e);
    } finally {
        await prisma.$disconnect();
    }

    setTimeout(mongoProPrisma, 10000);
}


export { mongoProPrisma };
