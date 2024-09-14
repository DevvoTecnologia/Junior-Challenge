import { Router } from "express";
import ringController from "../controllers/ringController";
import authenticateToken from "../middleware/authenticateToken";

const router = Router();

router.post("/rings", authenticateToken, ringController.createRing);
router.get("/rings/user", authenticateToken, ringController.getRingsByUserId);
router.get("/rings/:ringId", authenticateToken, ringController.getRingById);
router.put("/rings/:ringId", authenticateToken, ringController.updateRing);
router.delete("/rings/:ringId", authenticateToken, ringController.deleteRing);

export default router;
