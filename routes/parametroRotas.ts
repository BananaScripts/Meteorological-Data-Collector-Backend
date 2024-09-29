import { Router } from "express";
import mysql, { FieldPacket, ResultSetHeader, RowDataPacket } from "mysql2/promise"
import dbConfig from "../dbconfig";

const router = Router();

const config = dbConfig()


router.post('/cadastrar', async (req, res) => {
    const { cod_estacao, nome, fator, offset, unidadeMedida } = req.body;

    if (!cod_estacao || !nome || !fator || !offset || !unidadeMedida) {
        return res.status(400).send("Erro ao cadastrar, alguns dados estão ausentes.");
    }

    try {
        const connection = await mysql.createConnection(config);

        const [estacaoRows]: [RowDataPacket[], FieldPacket[]] = await connection.execute("SELECT * FROM Estacao WHERE cod_estacao = ?", [cod_estacao]);
        if (estacaoRows.length === 0) {
            return res.status(404).send("Estação não encontrada.");
        }

        const [tipoParametroResult] = await connection.execute<ResultSetHeader>(
            "INSERT INTO TipoParametro (nome, fator, offset, unidadeMedida) VALUES (?, ?, ?, ?)",
            [nome, fator, offset, unidadeMedida]
        );

        const tipoParametroId = tipoParametroResult.insertId;
        await connection.execute<ResultSetHeader>(
            "INSERT INTO Parametro (cod_estacao, cod_tipoParametro) VALUES (?, ?)",
            [cod_estacao, tipoParametroId]
        );

        await connection.end();
        res.status(201).send("Parâmetro e Tipo de parâmetro cadastrados com sucesso.");
    } catch (err) {
        res.status(500).send("Erro ao cadastrar parâmetro.");
        console.error(err);
    }
});




router.get('/listar', async (req, res)=>{
    try{
        const connection = await mysql.createConnection(config)
        const [rows] = await connection.query("SELECT * FROM Parametro")
        await connection.end()
        res.json(rows)
    } catch(err){
        res.status(500).send("Erro ao listar parâmetros")
        console.error(err)
    }
})

router.get('/buscar/:id', async(req, res)=>{
    const {id} = req.params
    try{
        const connection = await mysql.createConnection(config)
        const [rows] = await connection.execute<RowDataPacket[]>("SELECT * FROM Parametro WHERE cod_parametro = ?", [id])

        await connection.end()

        if(rows.length === 0){
            return res.status(404).send("Parâmetro não encontrado")
        }

        res.send(rows)

    }catch(err){
        res.status(500).send("Erro ao buscar tipo de parâmetro.")
        console.error(err)
    }
})

router.put('/atualizar/:id', async (req, res) =>{
    const {id} = req.params
    const {cod_tipoParametro, cod_estacao} = req.body

    if(!cod_tipoParametro || !cod_estacao){
        return res.status(400).send("Erro ao atualizar parâmetro, dados vazios.")
    }

    try{
        const connection = await mysql.createConnection(config)
        const [result] = await connection.execute<ResultSetHeader>('UPDATE Parametro SET cod_tipoParametro = ?, cod_estacao = ? WHERE cod_parametro = ?', [cod_tipoParametro, cod_estacao, id])
        
        await connection.end()

        if(result.affectedRows === 0){
            return res.status(404).send("Parâmetro não encontrado")
        }

        res.status(201).send("Parâmetro atualizado com sucesso.")
    }catch(err){
        res.status(500).send("Erro ao atualizar parâmetro")
        console.error(err)
    }
})

router.delete('/deletar/:id', async(req, res)=>{
    const {id} = req.params
    try{
        const connection = await mysql.createConnection(config)
        const [result] = await connection.execute<ResultSetHeader>("DELETE FROM Parametro WHERE cod_parametro = ?", [id])

        await connection.end()

        if(result.affectedRows === 0){
            return res.status(404).send('Parâmetro não encontrado')
        }

        res.status(201).send("Parâmetro deletado com sucesso")
    }catch(err){
        res.status(500).send("Erro ao deletar parâmetro")
        console.error(err)
    }
})

export default router;