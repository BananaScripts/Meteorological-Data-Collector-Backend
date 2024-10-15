import { listarEstacoes, buscarEstacoes, cadastrarEstacoes, atualizarEstacoes, deletarEstacoes } from "../controllers/stationController";
import { Router } from "express";

const router = Router();

router.get('/estacoes', listarEstacoes);
router.get('/estacao/:cod_estacao', buscarEstacoes);
router.post('/estacao/cadastrar', cadastrarEstacoes);
router.put('/estacao/atualizar/:cod_estacao', atualizarEstacoes);
router.delete('/estacao/deletar/:cod_estacao', deletarEstacoes)

export default router;
