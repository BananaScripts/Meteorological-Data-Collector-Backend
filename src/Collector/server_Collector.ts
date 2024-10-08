import app from "./app_Collector";

const PORT = 30015;

app.listen(PORT, ()=>{
    console.log(`Servidor de Collector rodando na porta: ${PORT}`);
});