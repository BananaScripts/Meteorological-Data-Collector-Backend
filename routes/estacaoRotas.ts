import { Router } from "express";
import mysql, { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import dbConfig from "../dbconfig";
import { connect } from "http2";


const router = Router()

const config = dbConfig()


router.post('/cadastrar', async(req,res)=>{
    const { nome, macAdress , cidade, estado, numero, cep} = req.body

    if( !nome || !macAdress || !cidade|| !estado || !numero || !cep){
        return res.status(400).send("Falha ao cadastrar a Estação,  verifique as informações")
    }
    try{
        const connection = await mysql.createConnection(config)
        const [result] = await connection.execute('INSERT INTO Estacao (nome, macAdress, cidade, estado, numero, cep) VALUES (?, ?, ?, ?, ?, ?)', [nome, macAdress , cidade, estado, numero, cep])

        await connection.end()

        res.status(201).send('Estação criada com sucesso')
    } catch(err){
        res.status(500).send('Erro ao cadastrar a Estação')
        console.error(err)
    }
})

router.get('/listar', async(req, res)=>{
    try{
        const connection = await mysql.createConnection(config)
        const [rows] = await connection.query('SELECT * FROM Estacao')
        connection.end()
        res.json(rows)
    } catch(err){
        res.status(500).send("Falha ao encontrar as Estações")
        console.error(err)
    }
})

router.get('/buscar/:id', async(req, res)=>{
    const {id} = req.params

    try{
        const connection = await mysql.createConnection(config)
        const [rows] = await connection.execute<RowDataPacket[]>('SELECT * FROM Estacao WHERE cod_estacao = ?', [id])

        await connection.end()

        if(rows.length === 0){
            return res.status(404).send("Estação não encontrada.")
        }

        res.send(rows)
    }catch(err){
        res.status(500).send("Erro ao buscar estação.")
        console.error(err)
    }
})


router.put('/atualizar/:id', async(req, res)=>{
    const {id} = req.params;
    const {cod_usuario, nome, macAdress , cidade, estado, numero, cep} = req.body;

    try{
        const connection = await mysql.createConnection(config)

        const [result] = await connection.execute<ResultSetHeader>('UPDATE Estacao SET nome = ?, macAdress = ?, cidade = ?, estado = ?, numero = ?, cep = ? WHERE cod_estacao = ?', [nome, macAdress, cidade, estado, numero, cep, id])

        await connection.end()

        if(result.affectedRows === 0){
            return res.status(404).send('Estação não encontrada.')
        }

        res.status(201).send('Estação atualizado com sucesso')
    } catch(err){
        res.status(500).send('Erro ao atualizar Estação.')
        console.error(err)
    }
})

router.delete('/deletar/:id', async(req, res) =>{
    const {id} = req.params;

    try{
        const connection = await mysql.createConnection(config)
        const [result] = await connection.execute<ResultSetHeader>('DELETE FROM Estacao WHERE cod_estacao = ?', [id])

        await connection.end()

        if(result.affectedRows === 0){
            res.send(404).send('Estação não encontrada.')
        }
        res.status(201).send("Estação deletada com sucesso.")
    } catch(err){
        res.status(500).send("Erro ao deletar Estação.")
        console.error(err)
    }
})

router.post('/dados', async(req,res) => {
    const {cod_estacao, cod_tipoParametro, data, hora, valor} = req.body

    if (!cod_estacao || !cod_tipoParametro || !data || !hora || !valor) {
        return res.status(400).send("Dados ausentes");
    }
    console.log({cod_estacao, cod_tipoParametro, data, hora, valor});

    try{
        const connection = await mysql.createConnection(config)
        await connection.execute(
            'INSERT INTO Dados (cod_estacao, cod_tipoParametro, data, hora, valor) VALUES (?, ?, ?, ?, ?)',
            [cod_estacao, cod_tipoParametro, data, hora, valor]
        );
        await connection.end()
        res.status(201).send("Dados cadastrados")
    }catch(e){
        res.status(500).send("Erro ao cadastrar")
        console.error(e)
    }

})

router.get('/listarDados', async (req, res) => {
    try {
        const connection = await mysql.createConnection(config);
        const [rows] = await connection.query(`
            SELECT * FROM Dados
        `);
        await connection.end();
        res.json(rows);
    } catch (err) {
        res.status(500).send("Erro ao listar dados.");
        console.error(err);
    }
});



export default router;