import { MongoClient, Db, Collection } from 'mongodb';
import * as dotenv from 'dotenv';
dotenv.config(); 

const uri = process.env.MONGO_URI || "mongodb+srv://bananascriptApi:APICODE..FATEC@meteorological-data-col.ruu8x.mongodb.net/?retryWrites=true&w=majority&appName=Meteorological-Data-Collector"; // URI do MongoDB
const dbName = process.env.DB_NAME || 'Meteorological-Data-Collector'; // Nome do banco de dados
const collectionName = process.env.COLLECTION || 'Data'; // Nome da coleção

let db: Db;
let collection: Collection;

const connectToDatabaseMongo = async (): Promise<Collection> => {
    if (!db) {
        const client = new MongoClient(uri);
        await client.connect();
        console.log('Conectado ao MongoDB');
        db = client.db(dbName);
        collection = db.collection(collectionName);
    }
    return collection;
};

export default connectToDatabaseMongo;
