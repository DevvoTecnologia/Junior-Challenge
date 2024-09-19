import express from "express";

import ringRoutes from "./routes/ringRoutes";
import authRoutes from "./routes/authRoutes";

import swaggerUi from "swagger-ui-express";
import swaggerFile from "./swagger-output.json";

import cors from "cors";

import { connectDb } from "./db";
import verifyToken from "./middlewares/verify-token";

const app = express();
const port = 4000;

connectDb();

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use("/api/rings", verifyToken, ringRoutes);
app.use("/api/auth", authRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
