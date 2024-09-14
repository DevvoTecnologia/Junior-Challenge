import "dotenv/config";
import express from "express";
import connectDB from "./config/db";
import ringRoutes from "./routes/ring-routes";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api", ringRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
