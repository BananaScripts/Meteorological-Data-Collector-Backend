import { MongoClient, Db } from 'mongodb';
import * as dotenv from 'dotenv';
dotenv.config(); 

const uri = process.env.MONGO_URI || "mongodb+srv://root:fatec@teste.kfaa4qw.mongodb.net/?retryWrites=true&w=majority&appName=Teste"; // URI do MongoDB
const dbName = process.env.DB_NAME || 'Meteorological'; // Nome do banco de dados

let db: Db;

export const connectToDatabase = async (): Promise<Db> => {
    if (!db) {

        const client = new MongoClient(uri);
        await client.connect();
        console.log('Conectado ao MongoDB');
        db = client.db(dbName);
    } else {
        console.log('Não Conectado ao MongoDB');
    }
    return db;
};
