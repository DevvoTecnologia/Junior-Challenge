import { Router } from "express";
import AuthController from "../controllers/auth/authController";
import { authSchema } from "../controllers/auth/schema";
import validateRoute from "../middlewares/validateRoute";
const router = Router();

router.post("/login", validateRoute(authSchema), AuthController.login);

export default router;
