import { Router } from "express";
import { ringsRouter } from "./modules/rings/routes/rings.route";
import { forgersRouter } from "./modules/forgers/routes/forgers.route";
import { usersRouter } from "./modules/users/routes/users.routes";

export const routes = Router();

routes.use("/", ringsRouter);
routes.use("/", forgersRouter);
routes.use("/", usersRouter);

routes.all("*", (_req, res) => {
  res.status(405).json({
    status: "error",
    message: "method not allowed",
  });
});
