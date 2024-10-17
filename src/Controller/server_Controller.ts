import app from "./app_Controller";

const PORT = 30105;

app.listen(PORT, ()=>{
    console.log(`Servidor de Controller rodando na porta: ${PORT}`);
});