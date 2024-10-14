import { Router } from "express";
import { listarParametros, buscarParametros, cadastrarParametros, atualizarParametros, deletarParametros } from "../controles/paramController";

const router = Router();

router.get('/parametros', listarParametros );
router.get('/parametro/:cod_parametro', buscarParametros);
router.post('/parametro/cadastrar', cadastrarParametros);
router.put('/parametro/atualizar/:cod_parametro', atualizarParametros);
router.delete('/parametro/deletar/:cod_parametro', deletarParametros);

export default router