import { Router } from "express";
import mysql, { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import dbConfig from "../dbconfig";

const router = Router()

const config = dbConfig()

router.post('/cadastrar', async (req, res)=>{

    const { nome, fator, offset, unidadeMedida} = req.body

    try{
        const connection = await mysql.createConnection(config)

        if(!nome || !fator || offset === undefined || !unidadeMedida){
            return res.status(400).send("Erro ao cadastrar tipo de parâmetro, algumas informações estão ausentes")
        }

        const [result] = await connection.execute("INSERT INTO TipoParametro ( nome, fator, offset, unidadeMedida) VALUES (?, ?, ?, ?)", [nome, fator, offset, unidadeMedida])

        await connection.end()

        res.status(201).send("Tipo de parâmetro cadastrado com sucesso.")
    }catch(err){
        res.status(500).send("Erro ao cadastrar tipo de parâmetro.")
        console.error(err)
    }
})

router.get('/listar', async(req, res)=>{
    try{
        const connection = await mysql.createConnection(config)
        const [rows] = await connection.query("SELECT * FROM TipoParametro")

        await connection.end()

        res.json(rows)
    
    }catch(err){
        res.status(500).send("Erro ao listar os tipos de parâmetros.")
        console.error(err)
    }
})

router.get('/buscar/:id', async(req, res)=>{
    const {id} = req.params
    try{
        const connection = await mysql.createConnection(config)
        const [rows] = await connection.execute<RowDataPacket[]>("SELECT * FROM TipoParametro WHERE cod_tipoParametro = ?", [id])

        await connection.end()

        if(rows.length === 0){
            return res.status(404).send("Tipo de parâmetro não encontrado.")
        }

        res.send(rows)

    }catch(err){
        res.status(500).send("Erro ao buscar o tipo de parâmetro solicitado.")
        console.error(err)
    }
})

router.put('/atualizar/:id', async(req, res)=>{
    const {id} = req.params
    const {cod_usuario, nome, fator, offset, unidadeMedida} = req.body

    if(!nome || !fator || offset === undefined || !unidadeMedida){
        return res.status(400).send("Erro ao atualizar tipo de parâmetro, dados vazios.")
    }

    try{
        const connection = await mysql.createConnection(config)
        const [result] = await connection.execute<ResultSetHeader>("UPDATE TipoParametro SET nome = ?, fator = ?, offset = ?, unidadeMedida = ? WHERE cod_tipoParametro = ?", [nome, fator, offset, unidadeMedida, id])

        await connection.end()

        if(result.affectedRows === 0){
            return res.status(404).send("Tipo de parâmetro não encontrado.")
        }

        res.status(201).send("Tipo de parâmetro atualizado com sucesso.")

    }catch(err){
        res.status(500).send("Erro ao atualizar tipo de parâmetro")
        console.error(err)
    }
})


router.delete('/deletar/:id', async(req, res)=>{
    const {id} = req.params

    try{
        const connection = await mysql.createConnection(config)
        const [result] = await connection.execute<ResultSetHeader>("DELETE FROM TipoParametro WHERE cod_tipoParametro = ?", [id])
        
        await connection.end()

        if(result.affectedRows === 0){
            return res.status(404).send("Tipo de parâmetro não encontrado.")
        }

        res.status(201).send("Tipo de parâmetro deletado com sucesso.")
    }catch(err){
        res.status(500).send("Erro ao deletar tipo de parâmetro.")
        console.error(err)
    }
})
export default router;