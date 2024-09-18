import express from "express";
import { userRouter, alarmRouter, stationRouter, paramRouter, paramTypeRouter } from "./routes/index"

const server = express();
const PORT = 3002;

server.use(express.json())

server.get('/', (req, res) =>{
    res.send("Servidor rodando.")
})

server.listen(PORT, ()=>{
    console.log(`Servidor rodando na porta ${PORT}`)
})

server.use('/usuario', userRouter)
server.use('/alarme', alarmRouter)
server.use('/estacao', stationRouter)
server.use('/parametro', paramRouter)
server.use('/tipoParametro', paramTypeRouter)
