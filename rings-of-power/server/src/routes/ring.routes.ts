import { Router } from "express";
import { RingController } from "../controllers/rings.controller";
import { createRingValidationRules } from "../middlewares/ring.middleware";
import { validateFields } from "../middlewares/validation.middleware";

const ringRouter = Router();

ringRouter.get("/", RingController.getAllRings);
ringRouter.get("/:id", RingController.getRingById);
ringRouter.post(
  "/",
  createRingValidationRules(),
  validateFields,
  RingController.createRing
);
ringRouter.put("/:id", RingController.updateRing);
ringRouter.delete("/:id", RingController.deleteRing);
export { ringRouter };
