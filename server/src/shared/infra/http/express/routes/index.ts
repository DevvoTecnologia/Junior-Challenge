import { Router } from "express";
import { ringsRoute } from "./rings/rings.routes";

export const router = Router();

router.use("/rings", ringsRoute);
