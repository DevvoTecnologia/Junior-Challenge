import express from "express";
import cors from "cors";
import { Ring } from "./models/Ring";
import { connectToDatabase, sequelize } from "./database";
import { env } from "./env";

import * as ringController from "./controllers/ring-controller";

const app = express();

app.use(cors());
app.use(express.json());

// Inicialize o modelo Ring
Ring.initialize(sequelize);

// Rotas
app.post("/create-ring", ringController.createRing);
app.get("/rings", ringController.getRings);
app.put("/update-ring/:id", ringController.updateRing);
app.delete("/delete-ring/:id", ringController.deleteRing);

const PORT = parseInt(env.PORT);

connectToDatabase().then(() => {
	app.listen(PORT, () => {
		console.log(`Servidor rodando na porta ${PORT}`);
	});
});
