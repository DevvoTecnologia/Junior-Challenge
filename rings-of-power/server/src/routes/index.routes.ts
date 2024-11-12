import { Router } from "express";
import { ringRouter } from "./ring.routes";

export const AppRoutes = Router();
AppRoutes.use("/ring", ringRouter);
