import { Router } from "express";
import mysql, { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import dbConfig from "../dbconfig";


const router = Router()

const config = dbConfig()


router.post('/cadastrar', async(req,res)=>{
    const {nome, dataNascimento, cpf, email, senha} = req.body

    if(!nome || !dataNascimento || !cpf || !email || !senha){
        return res.status(400).send("Falha ao cadastrar o usuario, verifique as credenciais")
    }
    try{
        const connection = await mysql.createConnection(config)
        const [result] = await connection.execute('INSERT INTO Usuario (nome, dataNascimento, cpf, email, senha) VALUES (?, ?, ?, ?, ?)', [nome, dataNascimento, cpf, email, senha])

        await connection.end()

        res.status(201).send('Usuario criado com sucesso')
    } catch(err){
        res.status(500).send('Erro ao cadastrar o cliente')
        console.error(err)
    }
})


router.get('/listar', async(req, res)=>{
    try{
        const connection = await mysql.createConnection(config)
        const [rows] = await connection.query('SELECT * FROM Usuario')
        connection.end()
        res.json(rows)
    } catch(err){
        res.status(500).send("Falha ao encontrar os usuarios")
        console.error(err)
    }
})

router.get('/buscar/:id', async(req, res)=>{
    const {id} = req.params;
    try{
        const connection = await mysql.createConnection(config)
        const [rows] = await connection.execute<RowDataPacket[]>('SELECT * FROM Usuario WHERE cod_usuario = ?', [id])

        await connection.end()

        if(rows.length === 0){
            return res.status(404).send("Usuário não encontrado.")
        }

        res.send(rows)

    }catch(err){
        res.status(500).send("Falha ao encontrar usuário.")
        console.error(err)
    }
})


router.put('/atualizar/:id', async(req, res)=>{
    const {id} = req.params;
    const {nome, dataNascimento, cpf, email, senha} = req.body;

    try{
        const connection = await mysql.createConnection(config)

        const [result] = await connection.execute<ResultSetHeader>('UPDATE Usuario SET nome = ?, dataNascimento = ?, cpf = ?, email = ?, senha = ? WHERE cod_usuario = ?', [nome, dataNascimento, cpf, email, senha, id])

        await connection.end()

        if(result.affectedRows === 0){
            return res.status(404).send('Usuário não encontrado.')
        }

        res.status(201).send('Usuário atualizado com sucesso')
    } catch(err){
        res.status(500).send('Erro ao atualizar usuário.')
        console.error(err)
    }
})

router.delete('/deletar/:id', async(req, res) =>{
    const {id} = req.params;

    try{
        const connection = await mysql.createConnection(config)
        const [result] = await connection.execute<ResultSetHeader>('DELETE FROM Usuario WHERE cod_usuario = ?', [id])

        await connection.end()

        if(result.affectedRows === 0){
            res.send(404).send('Usuário não encontrado.')
        }
        res.status(201).send("Usuário deletado com sucesso.")
    } catch(err){
        res.status(500).send("Erro ao deletar usuário.")
        console.error(err)
    }
})


export default router;