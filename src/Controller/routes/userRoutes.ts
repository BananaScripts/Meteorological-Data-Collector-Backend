import { Router } from "express";
import { listarUsuarios, buscarUsuarios, cadastrarUsuarios, atualizarUsuarios, deletarUsuarios } from "../controles/userController";

const router = Router();

router.get('/usuarios', listarUsuarios);
router.get('/usuario/:cod_usuario', buscarUsuarios);
router.post('/usuario/cadastrar', cadastrarUsuarios);
router.put('/usuario/atualizar/:cod_usuario', atualizarUsuarios);
router.delete('/usuario/deletar/:cod_usuario', deletarUsuarios);


export default router;