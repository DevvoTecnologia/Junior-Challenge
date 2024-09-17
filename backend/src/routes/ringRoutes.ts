import { Router, Request, Response } from "express";
import RingController from "../controllers/RingController";

const router = Router();

router.get("/get", RingController.GetRings);
router.get("/getById/:id", RingController.GetRingById);
router.post("/create", RingController.CreateRing);
router.patch("/update/:id", RingController.EditRing);
router.delete("/delete/:id", RingController.DeleteRing);

export default router;
