import express from "express";
import { rotasAlarme, rotasDados, rotasEstacao, rotasParametro, rotasTipoParametro, rotasUsuario, rotaLogin } from "./routes";

const cors = require('cors')
const app = express();

app.use(express.json());
app.use(cors())


app.use('/api', rotasUsuario);
app.use('/api', rotasEstacao);
app.use('/api', rotasParametro);
app.use('/api', rotasTipoParametro);
app.use('/api', rotasDados);
app.use('/api', rotasAlarme);
app.use('/api', rotaLogin)

export default app;