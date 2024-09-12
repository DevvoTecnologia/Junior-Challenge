import { Router } from "express";
import { criarAnel, listarAneis, atualizarAnel, deletarAnel } from "../controllers/ring.controller";

const router = Router();

router
    .route('/criar')
    .post(criarAnel);

router
    .route('/listar')
    .get(listarAneis);

router
    .route('/atualizar/:id')
    .put(atualizarAnel);

router
    .route('/deletar')
    .delete(deletarAnel);

export default router;