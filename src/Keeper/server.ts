import app from "./app_Keeper";

const PORT = 3205;

app.listen(PORT, ()=>{
    console.log(`Servidor de Tratamento rodando na porta: ${PORT}`);
});