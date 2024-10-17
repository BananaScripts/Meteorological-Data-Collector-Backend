import app from "./app_Keeper";

const PORT = 31005;

app.listen(PORT, ()=>{
    console.log(`Servidor de Tratamento rodando na porta: ${PORT}`);
});