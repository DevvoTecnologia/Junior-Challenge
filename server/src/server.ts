import express from "express";
import cors from "cors";
import { Ring } from "./models/Ring";
import { connectToDatabase, sequelize } from "./database";
import { env } from "./env";

import * as ringController from "./controllers/ring-controller";
import * as authController from "./controllers/auth-controller";

import { authMiddleware } from "./middleware/auth";
import { User } from "./models/User";

const app = express();

app.use(cors());
app.use(express.json());

// Inicialize o modelo Ring
Ring.initialize(sequelize);
User.initialize(sequelize);

// Rotas de autenticação
app.post("/register", authController.register);
app.post("/login", authController.login);

// Rotas protegidas
app.use(authMiddleware);
app.post("/create-ring", ringController.createRing);
app.get("/rings", ringController.getRings);
app.put("/update-ring/:id", ringController.updateRing);
app.delete("/delete-ring/:id", ringController.deleteRing);

const PORT = Number.parseInt(env.PORT);

connectToDatabase().then(() => {
	app.listen(PORT, () => {
		console.log(`Servidor rodando na porta ${PORT}`);
	});
});
