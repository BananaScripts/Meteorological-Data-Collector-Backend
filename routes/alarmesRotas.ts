import { Router } from "express";
import mysql, { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import dbConfig from "../dbconfig";


const router = Router()

const config = dbConfig()



router.post('/cadastrar', async(req,res)=>{
    const {nome, valor} = req.body

    if(!nome || !valor){
        return res.status(400).send("Falha ao cadastrar o alarme, verifique as credenciais")
    }
    try{
        const connection = await mysql.createConnection(config)

        try{
            const [result] = await connection.execute('Insert into Alarme (nome, valor) VALUES (?, ?)', [nome, valor])

            await connection.end()
    
            res.status(201).send('Alarme criado com sucesso')

        } catch(err){
            res.status(500).send('Erro em cadastrar um Alarme')
        }

    } catch(err){
        res.status(500).send('Erro ao conectar com o Banco de Dados')
    }
})



router.get('/listar', async(req, res)=>{
    try{
        const connection = await mysql.createConnection(config)

        try {

            const [rows] = await connection.query('Select * from Alarme')
            connection.end()
            res.json(rows)

        } catch(err){
            res.status(500).send("Falha ao buscar os alarmes")
        }


    } catch(err){
        res.status(500).send("Falha ao conectar com o Banco de Dados")
    }
})

router.get('/buscar/:id', async (req, res)=>{
    const {id} = req.params;

    try{
        const connection = await mysql.createConnection(config)
        const [rows] = await connection.execute<RowDataPacket[]>('SELECT * FROM Alarme WHERE cod_alarme = ?', [id])

        await connection.end()

        if(rows.length === 0){
            return res.status(404).send('Alarme não encontrado.')
        }

        res.send(rows)
    }catch(err){
        res.status(500).send("Erro ao encontrar alarme.")
        console.error(err);
    }
})


router.put('/atualizar/:id', async(req, res)=>{
    const {id} = req.params;
    const {nome, valor} = req.body;

    try{
        const connection = await mysql.createConnection(config)

        try{

            const [result] = await connection.execute<ResultSetHeader>('Update Alarme set nome = ?, valor = ?, WHERE cod_alarme = ?', [nome, valor, id])

            await connection.end()
    
            if(result.affectedRows === 0){
                return res.status(404).send('Alarme não encontrado.')
            }

            res.status(201).send('Alarme atualizado com sucesso')

        } catch(err){
            res.status(500).send('Erro ao atualizar alarme.')
            console.error(err)
        }
        
    } catch(err){
        res.status(500).send('Erro ao conectar com o Banco de Dados.')
        console.error(err)
    }
})



router.delete('/deletar/:id', async(req, res)=>{
    const {id} = req.params;

    try{

        const connection = await mysql.createConnection(config)


        try{
            

            const [result] = await connection.execute<ResultSetHeader>('Delete from Alarme where cod_alarme = ?', [id])

            await connection.end()

            if(result.affectedRows === 0){
                res.send(404).send('Alarme não encontrado.')
            }

        } catch(err){
            res.status(500).send("Falha ao deletar o Alarme escolhido")
        }



    } catch(err){
        res.status(500).send("Falha ao conectar ao Banco de Dados")
    }
    

})


export default router;