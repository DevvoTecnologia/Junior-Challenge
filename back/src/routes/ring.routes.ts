import { Router } from "express";
import { criarAnel, listarAneis, atualizarAnel, deletarAnel } from "../controllers/ring.controller";
import {authMiddleware} from "../middlewares/auth.middleware";

const router = Router();

router
    .route('/anel')
    .post(authMiddleware, criarAnel)
    .get(authMiddleware, listarAneis);

router
    .route('/anel/:id')
    .put(authMiddleware, atualizarAnel)
    .delete(authMiddleware, deletarAnel)

export default router;