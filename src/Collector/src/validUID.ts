import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { connectToDatabase } from './connectMongoDB'; 
import corsMongo from 'cors'; 


async function validUID(req: Request, res: Response, data: any) {


    const uid = req.body.uid;

    if (!uid) {
        return res.status(400).json({ error: 'UID ausente' });
    } if (uid !== "08D1F999F194") {
        return res.status(400).json({ error: 'UID inválido' });
    } else {

        try {
            const db = await connectToDatabase(); 
            const collection = db.collection('Data');
            
            
            const result = await collection.insertOne(data);
            console.log('Dados inseridos no MongoDB:', result.insertedId);
    
            res.status(200).json({ insert: 'true', id: result.insertedId });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao salvar os dados no banco de dados' });
        }

    }

}

export default validUID;