import { Router } from "express";
import userController from "../controllers/userController";
import authenticateToken from "../middleware/authenticateToken";

const router = Router();

router.post("/users", userController.createUser);
router.get("/users", authenticateToken, userController.getUsers);
router.get("/login", userController.login);
router.delete("/users", authenticateToken, userController.deleteUser);

export default router;
