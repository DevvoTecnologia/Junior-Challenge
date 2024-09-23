import { Router } from "express";
import {
  createRing,
  deleteRing,
  getRings,
  UpdateRing,
} from "../controllers/ringController";

const router = Router();

router.post("/", createRing);
router.get("/", getRings);
router.put("/:id", UpdateRing);
router.delete("/:id", deleteRing);

export default router;
