import express from "express";
import ringRoutes from "./routes/ringRoutes";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "./swagger-output.json";

import { connectDb } from "./db";

const app = express();
const port = 4000;

connectDb();

app.use(express.json());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use("/api/rings", ringRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
