import express from "express";
import { rotasAlarme, rotasDados, rotasEstacao, rotasParametro, rotasTipoParametro, rotasUsuario } from "./routes";

const app = express();

app.use(express.json());

app.use('/api', rotasUsuario);
app.use('/api', rotasEstacao);
app.use('/api', rotasParametro);
app.use('/api', rotasTipoParametro);
app.use('/api', rotasDados);
app.use('/api', rotasAlarme);

export default app;