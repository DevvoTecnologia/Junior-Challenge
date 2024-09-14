import { Router } from "express";
import { criarUser, buscarTodosAneis } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router
    .route('/signup')
    .post(criarUser)

router
    .route('/user/aneis')
    .get(authMiddleware, buscarTodosAneis)

export default router;