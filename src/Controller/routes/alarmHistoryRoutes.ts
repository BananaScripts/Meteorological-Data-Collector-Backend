import { Router } from "express";
import { listarHistAlarmes, buscarHistAlarmes, cadastrarHistAlarmes, atualizarHistAlarmes, deletarHistAlarmes } from "../controllers/alarmHistoryController";

const router = Router();

router.get('/histAlarmes', listarHistAlarmes)
router.get('/histAlarme/:cod_historicoAlarme', buscarHistAlarmes);
router.post('/histAlarme/cadastrar', cadastrarHistAlarmes);
router.put('/histAlarme/atualizar/:cod_historicoAlarme', atualizarHistAlarmes);
router.delete('/histAlarme/deletar/:cod_historicoAlarme', deletarHistAlarmes);

export default router;