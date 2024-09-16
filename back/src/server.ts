import "reflect-metadata";
import express from "express";
import cors from "cors";
import "dotenv";
import { AppDataSource } from "./database/data-source";
import routers from "./app/routes/routes";

const { PORT_SERVER_BACK } = process.env;

const app = express();

app.use(cors());

app.use(express.json());

app.use(routers);

AppDataSource.initialize()
  .then(async () => {
    console.log("Database ok");
    app.listen(PORT_SERVER_BACK, () => {
      console.log(`Server start in Port ${PORT_SERVER_BACK}`);
    });
  })
  .catch(async () => {
    console.log("erro");
  });
