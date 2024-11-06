import { MongoClient, Db, Collection } from 'mongodb';
import { PrismaClient } from "@prisma/client";
import * as dotenv from 'dotenv';
import connectToDatabaseMongo from './services/mongoConnect';

const prisma = new PrismaClient();

// Função principal para migrar dados
export const migrarDadosMongoParaSupabase = async () => {  

    while (true) {

        const collection = await connectToDatabaseMongo();
        const countDataMongoDB = await collection.countDocuments();
        
        if (countDataMongoDB > 0) {
        
            try {
            
                
                const ultimoDado = await collection.find().sort({ _id: -1 }).limit(1).toArray();
                
                if (!ultimoDado || !ultimoDado[0]) {
                    console.log("Nenhum dado encontrado no MongoDB.");
                    return;
                }
            
                const dadoMongo = ultimoDado[0];
                
            
                // Verificação do UID da estação
                const uidEsperado = "08D1F999F194";
                if (dadoMongo.uid !== uidEsperado) {
                    console.log("UID não corresponde à estação esperada.");
                    return;
                }
                
            
                // Obter os parâmetros do banco de dados relacional
                const tiposParametros = await prisma.tipoParametro.findMany();
                
                // Verificar e mapear dados do JSON com parâmetros no Supabase
                const dadosParaInserir = [];
                for (const key in dadoMongo) {
                    if (key !== "uid" && dadoMongo.hasOwnProperty(key)) {
                        const tipoParametro = tiposParametros.find(param => param.json === key);
                        if (tipoParametro) {
                            dadosParaInserir.push({
                                cod_parametro: tipoParametro.cod_tipoParametro,
                                Valor: dadoMongo[key],
                                unixtime: Math.floor(Date.now() / 1000)
                            });
                        }
                    }
                }
            
                // Inserir dados no Supabase
                
                for (const dado of dadosParaInserir) {
                    await prisma.dados.create({
                        data: dado
                    });
                    
                }
            
                // Deletar o documento no MongoDB após a inserção
                await collection.deleteOne({ _id: dadoMongo._id });
                
                const countDataMongoDB = await collection.countDocuments();
                console.log("Tratamento concluído (restam " + countDataMongoDB + " dados).");
            
            } catch (error) {
                    console.error("Erro ao migrar dados:", error);
            } finally {
                await prisma.$disconnect();
                
            }
        } else {
            const countDataMongoDB = await collection.countDocuments();
            
        }

    }    
    
};
