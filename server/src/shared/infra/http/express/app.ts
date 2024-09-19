import express, { Request, Response } from "express";
import { router } from "./routes";
// import { createConnection } from "../../typeorm/dataSource";
// import "reflect-metadata"
// import "./../../../container"

// createConnection()

export const app = express();

app.use(express.json());

app.use(router);

app.use((request: Request, response: Response) => {
  return response.status(404).json({
    message: `Not found!`,
  });
});

export const startServer = () => {
  return app.listen(3333, () => console.log("Server is running"));
};
