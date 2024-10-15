import { listarTiposParametros, buscarTiposParametros, cadastrarTiposParametros, atualizarTiposParametros, deletarTiposParametros } from "../controllers/paramTypeController";
import { Router } from "express";

const router = Router();

router.get('/tiposParametros', listarTiposParametros);
router.get('/tipoParametro/:cod_tipoParametro', buscarTiposParametros);
router.post('/estacao/cadastrar', cadastrarTiposParametros);
router.put('/estacao/atualizar/:cod_tipoParametro', atualizarTiposParametros);
router.delete('/estacao/deletar/:cod_tipoParametro', deletarTiposParametros)

export default router;
