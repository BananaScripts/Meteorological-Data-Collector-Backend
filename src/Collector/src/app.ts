import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { connectToDatabase } from './connectMongoDB'; 
import corsMongo from 'cors'; 
import validUID from './validUID';
import { execSync } from 'child_process';


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



// Função para obter os IPs da tabela ARP
function getAllIps(): string[] {
    // Executa o comando 'arp -a' e converte o resultado para string
    const arpOutput = execSync('arp -a').toString();
    const ips: string[] = [];
    
    // Divide a saída em linhas e filtra as que contêm endereços IP
    arpOutput.split('\n').forEach((line) => {
        const match = line.match(/\b192\.168\.\d{1,3}\.\d{1,3}\b/);
        if (match) {
            ips.push(match[0]);
        }
    });

    return ips;
}

// Função para enviar ping para cada IP da lista
function pingAllIps(ips: string[]) {
    ips.forEach((ip) => {
        try {
            
            const nullDevice = process.platform === 'win32' ? 'nul' : '/dev/null';
            execSync(`ping ${process.platform === 'win32' ? '-n 1' : '-c 1'} ${ip} > ${nullDevice} 2>&1`);
        } catch (error) {
            console.error(`Erro ao enviar ping para ${ip}:`);
        }
    });
}

// Executa as funções
const ips = getAllIps();
console.log(`  `);
pingAllIps(ips);
