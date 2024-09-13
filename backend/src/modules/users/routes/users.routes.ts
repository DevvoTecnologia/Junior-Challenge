import { Router } from "express";
import { UsersController } from "../controllers/UsersController";

export const usersRouter = Router();

const usersController = new UsersController();

usersRouter.post("/register", usersController.create);

usersRouter.post("/login", usersController.authenticate);
