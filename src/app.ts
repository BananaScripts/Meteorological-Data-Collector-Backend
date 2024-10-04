import express from "express";
import { rotasEstacao, rotasParametro, rotasTipoParametro, rotasUsuario } from "./routes";

const app = express();

app.use(express.json());

app.use('/api', rotasUsuario);
app.use('/api', rotasEstacao);
app.use('/api', rotasParametro);
app.use('/api', rotasTipoParametro);

export default app;