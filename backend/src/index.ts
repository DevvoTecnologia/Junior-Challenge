import express from "express";
import cors from "cors";
import ringRoutes from "./routes/ringRoutes";
import userRoutes from "./routes/userRoutes";
import { AppDataSource } from "./utils/data-source";

const app = express();
app.use(cors());
app.use(express.json());

AppDataSource.initialize()
	.then(async () => {
		app.use("/api", ringRoutes);
		app.use("/api", userRoutes);
		app.listen(3333, () => {
			console.log("Server iniciado na porta 3333");
			console.log();
		});
	})
	.catch((error) => {
		console.error("Erro durante a inicialização do Data Source:", error);
	});
