
import { listarTiposParametros, buscarTiposParametros, cadastrarTiposParametros, atualizarTiposParametros, deletarTiposParametros } from "../controllers/paramTypeController";


import { Router } from "express";

const router = Router();

router.get('/tiposParametros', listarTiposParametros);
router.get('/tipoParametro/:cod_tipoParametro', buscarTiposParametros);
router.post('/tipoParametro/cadastrar', cadastrarTiposParametros);
router.put('/tipoParametro/atualizar/:cod_tipoParametro', atualizarTiposParametros);
router.delete('/tipoParametro/deletar/:cod_tipoParametro', deletarTiposParametros)

export default router;
