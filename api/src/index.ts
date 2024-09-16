import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { anelRouter, authRouter } from "./routes";
import cookieParser from "cookie-parser";

dotenv.config();

mongoose
	.connect(process.env.MONGODB_URI as string)
	.then(() => {
		console.log("Conectado ao MongoDB!");
	})
	.catch((error) => {
		console.error("Erro ao conectar ao MongoDB:", error);
	});

const port = process.env.PORT ?? 3000;
const app = express();

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Credentials", "true");
	res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
	next();
});
app.use(express.json());
app.use(cookieParser());

app.use("/anel", anelRouter);
app.use("/auth", authRouter);

app.get("/", (req, res) => {
	res.send("Health Check");
});

// setupSwagger(app);

app.listen(port, () => {
	console.log(`Servidor iniciado na porta ${port}!`);
});
