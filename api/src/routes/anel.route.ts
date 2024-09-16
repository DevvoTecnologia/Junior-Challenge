import express from "express";
import { AnelController } from "../controllers";
import { middlewareVerificaToken } from "../utils/token.util";

const userRouter = express.Router();

userRouter.get("/", AnelController.listar);
userRouter.get("/:id", AnelController.buscarPorId);
userRouter.post("/", middlewareVerificaToken, AnelController.criar);
userRouter.put("/:id", middlewareVerificaToken, AnelController.atualizar);
userRouter.delete("/:id", middlewareVerificaToken, AnelController.deletar);

export default userRouter;
