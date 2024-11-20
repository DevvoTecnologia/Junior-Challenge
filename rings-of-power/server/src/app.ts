import express from "express";
import "reflect-metadata";
import cors from "cors";
import { AppRoutes } from "./routes/index.routes";
import { errorMiddleware } from "./middlewares/error.middleware";

const app = express();

const corsOption = {
  credentials: true,
  origin: ["http://localhost:3000", "http://localhost:8000"],
};
app.use(cors(corsOption));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", [
    "GET",
    "OPTIONS",
    "POST",
    "DELETE",
    "PATCH",
    "PUT",
    "*",
  ]);
  next();
});

app.use(express.json());

app.use(AppRoutes);
app.use(errorMiddleware);

export default app;
