import validateRoute from "../middlewares/validateRoute";
import UsersController from "../controllers/users/usersController";
import { Router } from "express";
import { usersSchema } from "../controllers/users/schema";
const router = Router();

router.get("/users", UsersController.getAll);
router.get("/users/:id", UsersController.getOne);
router.delete("/users/:id", UsersController.delete);
router.post("/users", validateRoute(usersSchema), UsersController.create);
router.put("/users/:id", validateRoute(usersSchema), UsersController.update);

export default router;
