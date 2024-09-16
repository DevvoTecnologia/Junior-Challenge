import express from "express";
import cors from "cors";
import path from "path";
import "./database/connection";
import ringRoutes from "./routes/ringRoutes";
import { swaggerUi, swaggerSpec, swaggerUiOptions } from "./config/swagger";

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

const uploadPath = path.join(__dirname, "middleware/uploads");
app.use("/uploads", express.static(uploadPath));

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, swaggerUiOptions)
);

app.use("/api", ringRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Swagger UI available at http://localhost:${PORT}/api-docs`);
});
