import express from "express";
import { AuthController } from "../controllers";
import { middlewareVerificaToken } from "../utils/token.util";

const authRouter = express.Router();

authRouter.post("/entrar", AuthController.entrar);
authRouter.post("/registrar", AuthController.registrar);
authRouter.get("/usuario", middlewareVerificaToken, AuthController.buscarUsuario);

export default authRouter;
