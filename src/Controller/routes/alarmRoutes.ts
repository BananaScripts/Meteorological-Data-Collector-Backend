import { Router } from "express";
import { listarAlarmes, buscarAlarmes, cadastrarAlarmes, atualizarAlarmes, deletarAlarmes, monitorar } from "../controllers/alarmController";


const router = Router();

router.get('/alarmes', listarAlarmes);
router.get('/alarme/:cod_alarme', buscarAlarmes);
router.post('/alarme/cadastrar', cadastrarAlarmes);
router.put('/alarme/atualizar/:cod_alarme', atualizarAlarmes);
router.delete('/alarme/deletar/:cod_alarme', deletarAlarmes);
router.post('/alarme/monitorar', monitorar)

export default router;