import multer from "multer";
import multerConfig from "../config/multer";
import RingsController from "../controllers/rings/ringsController";
import { Router } from "express";
import validateRoute from "../middlewares/validateRoute";
import { ringSchema } from "../controllers/rings/schema";
const router = Router();

const upload = multer(multerConfig);

router.get("/rings", RingsController.getAll);
router.get("/rings/:id", RingsController.getOne);
router.post(
	"/rings",
	upload.single("file"),
	validateRoute(ringSchema),
	RingsController.create
);
router.put(
	"/rings/:id",
	upload.single("file"),
	validateRoute(ringSchema),
	RingsController.update
);
router.delete("/rings/:id", RingsController.delete);

export default router;
