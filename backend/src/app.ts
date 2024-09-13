import express from "express";
import cors from "cors";
import { connection } from "./database/database";
import { routes } from "./routes";

export const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(express.static("public"));
app.use(routes);

(async () => {
  try {
    await connection.authenticate();
    console.log("Conexão com o banco de dados estabelecida com sucesso.");
  } catch (error) {
    console.error("Não foi possível conectar ao banco de dados:", error);
  }
})();
