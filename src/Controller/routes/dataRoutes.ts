import { Router } from "express";
import { listarDados, buscarDados, cadastrarDados, atualizarDados, deletarDados, deletarDadosPorIntervaloID } from "../controllers/dataController";

const router = Router();

router.get('/dados', listarDados);
router.get('/dado/:cod_dados', buscarDados);
router.post('/dado/cadastrar', cadastrarDados);
router.put('/dado/atualizar/:cod_dados', atualizarDados);
router.delete('/dado/deletar/:cod_dados', deletarDados);
router.delete('/dado/deletar/:idInicial/:idFinal', deletarDadosPorIntervaloID);


export default router;