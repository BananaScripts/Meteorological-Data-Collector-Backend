import { Router } from "express";
import mysql, { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import dbConfig from "../dbconfig";

const router = Router();
const config = dbConfig();

// Rota para cadastrar alarme
router.post('/cadastrar', async (req, res) => {
    const { nome, valor, condicao, cod_tipoParametro } = req.body;

    if (!nome || !valor || !condicao || !cod_tipoParametro) {
        return res.status(400).send("Falha ao cadastrar o alarme, dados ausentes");
    }

    try {
        const connection = await mysql.createConnection(config);

        try {
            const [result] = await connection.execute('INSERT INTO Alarme (nome, valor, condicao, cod_tipoParametro) VALUES (?, ?, ?, ?)', [nome, valor, condicao, cod_tipoParametro]);

            await connection.end();

            res.status(201).send("Alarme cadastrado com sucesso");
        } catch (err) {
            await connection.end();
            res.status(500).send("Erro ao cadastrar o alarme");
            console.error(err);
        }
    } catch (err) {
        res.status(500).send("Erro ao conectar com o banco de dados");
        console.error(err);
    }
});

// Rota para listar todos os alarmes
router.get('/listar', async (req, res) => {
    try {
        const connection = await mysql.createConnection(config);

        try {
            const [rows] = await connection.query<RowDataPacket[]>('SELECT * FROM Alarme');
            await connection.end();
            res.json(rows);
        } catch (err) {
            await connection.end();
            res.status(500).send("Erro ao listar os alarmes");
            console.error(err);
        }
    } catch (err) {
        res.status(500).send("Erro ao conectar com o banco de dados");
        console.error(err);
    }
});

// Rota para buscar um alarme específico pelo ID
router.get('/buscar/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const connection = await mysql.createConnection(config);

        try {
            const [rows] = await connection.execute<RowDataPacket[]>('SELECT * FROM Alarme WHERE cod_alarme = ?', [id]);
            await connection.end();

            if (rows.length === 0) {
                return res.status(404).send('Alarme não encontrado');
            }

            res.json(rows[0]);
        } catch (err) {
            await connection.end();
            res.status(500).send("Erro ao buscar o alarme");
            console.error(err);
        }
    } catch (err) {
        res.status(500).send("Erro ao conectar com o banco de dados");
        console.error(err);
    }
});


router.put('/atualizar/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, valor, condicao, cod_tipoParametro } = req.body;

    if (!nome || !valor || !condicao || !cod_tipoParametro) {
        return res.status(400).send("Erro ao atualizar o alarme, dados ausentes");
    }

    try {
        const connection = await mysql.createConnection(config);

        try {
            const [result] = await connection.execute<ResultSetHeader>(
                'UPDATE Alarme SET nome = ?, valor = ?, condicao = ?, cod_tipoParametro = ? WHERE cod_alarme = ?',
                [nome, valor, condicao, cod_tipoParametro, id]
            );
            

            await connection.end();

            if (result.affectedRows === 0) {
                return res.status(404).send("Alarme não encontrado");
            }

            res.status(200).send("Alarme atualizado com sucesso");
        } catch (err) {
            await connection.end();
            res.status(500).send("Erro ao atualizar o alarme");
            console.error(err);
        }
    } catch (err) {
        res.status(500).send("Erro ao conectar com o banco de dados");
        console.error(err);
    }
});


// Rota para deletar um alarme pelo ID
router.delete('/deletar/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const connection = await mysql.createConnection(config);

        try {
            const [result] = await connection.execute<ResultSetHeader>(
                'DELETE FROM Alarme WHERE cod_alarme = ?',
                [id]
            );

            await connection.end();

            if (result.affectedRows === 0) {
                return res.status(404).send("Alarme não encontrado");
            }

            res.status(200).send("Alarme deletado com sucesso");
        } catch (err) {
            await connection.end();
            res.status(500).send("Erro ao deletar o alarme");
            console.error(err);
        }
    } catch (err) {
        res.status(500).send("Erro ao conectar com o banco de dados");
        console.error(err);
    }
});

export default router;
