import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import ringRoutes from "./routes/ringRoutes";

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/ringsDB");

app.use("/api", ringRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
