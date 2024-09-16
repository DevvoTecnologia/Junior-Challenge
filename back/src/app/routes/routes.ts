import { Router } from "express";
import anelRouter from "../controllers/ListarAnelController";

const routers = Router();

routers.use("/aneis", anelRouter);
// routers.use("/aneis", anelRouter);

export default routers;
