import { Router } from "express";
import { criarPortador, buscarTodosAneis } from "../controllers/portador.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router
    .route('/portador')
    .post(criarPortador)

router
    .route('/portador/aneis')
    .get(authMiddleware, buscarTodosAneis)

export default router;