import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { connectToDatabase } from './connectMongoDB'; 
import corsMongo from 'cors'; 
import validUID from './validUID';

const app = express();

app.use(corsMongo());
app.use(bodyParser.json());

app.get('/', (req: Request, res: Response) => {
    res.send('API de Recepção de Dados');
});

app.post('/SendData', async (req: Request, res: Response) => {
    const data = req.body;
    console.log('Dados recebidos:', data);

    validUID(req, res, data);

});

app.get('/dados', async (req: Request, res: Response) => {
    try {
        const db = await connectToDatabase(); 
        const collection = db.collection('Data');
        
        const data = await collection.find({}).toArray();
        console.log('Dados recuperados do MongoDB:', data);

        res.status(200).json(data);
    } catch (error) {
        console.error('Erro ao recuperar dados do MongoDB:', error);
        res.status(500).json({ error: 'Erro ao buscar os dados no banco de dados' });
    }
});

export default app;

function cors(): any {
    throw new Error('Function not implemented.');
}
