import { Application, Router } from "express";
import bodyParser from "body-parser";
import auth from "./authRoutes";
import usersRoutes from "./usersRoutes";
import carriersRoutes from "./carriersRoutes";
import ringsRoutes from "./ringsRoutes";

import authMiddleware from "../middlewares/auth";

export default (app: Application) => {
	const router = Router();
	const middlewareAuth = router.use(authMiddleware);

	app.use(
		bodyParser.json(),
		auth,
		usersRoutes,
		middlewareAuth,
		carriersRoutes,
		ringsRoutes
	);
};
