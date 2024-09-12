import { Router } from "express";
import CarriersController from "../controllers/carriers/carriersController";
import validateRoute from "../middlewares/validateRoute";
import { carriersSchema } from "../controllers/carriers/schema";
const router = Router();

router.get("/carriers", CarriersController.getAll);
router.get("/carriers/:id", CarriersController.getOne);
router.delete("/carriers/:id", CarriersController.delete);
router.post(
	"/carriers",
	validateRoute(carriersSchema),
	CarriersController.create
);
router.put(
	"/carriers/:id",
	validateRoute(carriersSchema),
	CarriersController.update
);

export default router;
