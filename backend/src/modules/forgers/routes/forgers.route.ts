import { Router } from "express";
import { ForgersController } from "../controllers/ForgersController";
import { auth } from "../../../middlewares/auth";

export const forgersRouter = Router();

const forgersController = new ForgersController();

forgersRouter.get("/forgers", auth, forgersController.listAll);
