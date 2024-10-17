import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { connectToDatabase } from './mongodb'; 



const app = express();
app.use(bodyParser.json());

app.get('/', (req: Request, res: Response) => {
    res.send('API de Recepção de Dados');
});

app.post('/data', async (req: Request, res: Response) => {
    const data = req.body;
    console.log('Dados recebidos:', data);

    try {
        const db = await connectToDatabase(); 
        const collection = db.collection('Data'); // nome da coleção do MongoDB
        
        
        const result = await collection.insertOne(data);
        console.log('Dados inseridos no MongoDB:', result.insertedId);

        res.status(200).json({ insert: 'true', id: result.insertedId });
    } catch (error) {
        console.error('Erro ao inserir dados no MongoDB:', error);
        res.status(500).json({ error: 'Erro ao salvar os dados no banco de dados' });
    }
});

export default app;