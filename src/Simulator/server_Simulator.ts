import app from "./app_Simulator";

const PORT = 3020;

app.listen(PORT, ()=>{
    console.log(`Servidor de Simulator rodando na porta: ${PORT}`);
});