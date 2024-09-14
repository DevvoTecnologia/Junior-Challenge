import { Router } from "express";
import { createRing, getRings, updateRing, deleteRing } from "../controllers/ringController";

const router = Router();

router.post("/rings", createRing);
router.get("/rings", getRings);
router.put("/rings/:id", updateRing);
router.delete("/rings/:id", deleteRing);

export default router;
