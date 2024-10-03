import express from "express";
import { rotasUsuario } from "./routes";

const app = express();

app.use(express.json());

app.use('/api', rotasUsuario);

export default app;