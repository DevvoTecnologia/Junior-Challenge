import { Router } from "express";
import { RingController } from "../controllers/RingController";

const router = Router();
const ringController = new RingController();

router.post("/aneis", (req, res) => ringController.create(req, res));
router.get("/aneis", (req, res) => ringController.getAll(req, res));
router.put("/aneis/:id", (req, res) => ringController.update(req, res));
router.delete("/aneis/:id", (req, res) => ringController.delete(req, res));

export default router;
