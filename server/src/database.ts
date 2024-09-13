import { Sequelize } from "sequelize";
import path from "node:path";

const config = require(
	path.join(__dirname, "config", "config.json"),
).development;

export const sequelize = new Sequelize(
	config.database,
	config.username,
	config.password,
	{
		host: config.host,
		port: config.port,
		dialect: "postgres",
		logging: false,
	},
);

export async function connectToDatabase() {
	try {
		await sequelize.authenticate();
		console.log("Conexão com o banco de dados estabelecida com sucesso.");
	} catch (error) {
		console.error("Não foi possível conectar ao banco de dados:", error);
	}
}
