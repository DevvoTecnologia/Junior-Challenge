import cors from "cors";
import express from "express";

import router from "./routes";

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello, TypeScript Node Express!");
});

app.use("/files", express.static("uploads"));
app.use(express.json());
app.use("/api/v1", router);

export default app;
