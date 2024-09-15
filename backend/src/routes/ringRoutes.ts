// src/routes/ringsRoutes.ts
import { Router, Request, Response } from "express";
import RingsController from "../modules/Rings/controllers/RingsController";
import upload from "../middleware/uploadMiddleware";

const router = Router();
const ringsController = new RingsController();

router.get("/rings/:id", (req: Request, res: Response) =>
  ringsController.getRingById(req, res)
);
router.get("/rings", (req: Request, res: Response) =>
  ringsController.getAllRings(req, res)
);

router.post("/rings", upload.single("image"), (req: Request, res: Response) =>
  ringsController.createRing(req, res)
);

router.put(
  "/rings/:id",
  upload.single("image"),
  (req: Request, res: Response) => ringsController.updateRing(req, res)
);
router.delete("/rings/:id", (req: Request, res: Response) =>
  ringsController.deleteRing(req, res)
);


export default router;
