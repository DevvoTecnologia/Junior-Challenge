import { Router } from "express";
import { RingsController } from "../controllers/RingsController";
import { auth } from "../../../middlewares/auth";

export const ringsRouter = Router();

const ringsController = new RingsController();

ringsRouter.get("/rings", auth, ringsController.listAll);

ringsRouter.post("/ring", auth, ringsController.create);

ringsRouter.put("/ring", auth, ringsController.update);

ringsRouter.delete("/ring/:id", auth, ringsController.remove);
