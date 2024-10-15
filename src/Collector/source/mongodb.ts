import { MongoClient, Db } from 'mongodb';
import * as dotenv from 'dotenv';
dotenv.config(); 

const uri = process.env.MONGO_URI || "mongodb+srv://admmetereological:adm123@dbmetereological.hxodp.mongodb.net/?retryWrites=true&w=majority&appName=dbmetereological"; // URI do MongoDB
const dbName = process.env.DB_NAME || 'dbmeterological'; // Nome do banco de dados

let db: Db;

export const connectToDatabase = async (): Promise<Db> => {
    if (!db) {
        const client = new MongoClient(uri);
        await client.connect();
        console.log('Conectado ao MongoDB');
        db = client.db(dbName);
    }
    return db;
};
