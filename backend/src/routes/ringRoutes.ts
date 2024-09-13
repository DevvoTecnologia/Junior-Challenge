import { Router } from "express";
import ringController from "../controllers/ringController";

const router = Router();

router.post("/rings", ringController.createRing);
router.get("/rings", ringController.getRings);
router.get("/rings/:id", ringController.getRingById);
// router.put('/rings/:id', ringController.updateRing);
router.delete("/rings/:id", ringController.deleteRing);

export default router;
