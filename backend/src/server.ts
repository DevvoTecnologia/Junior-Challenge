import dotenv from "dotenv/config";
import express from "express";
import connectToDatabase from "./database";
import cors from "cors";
import {
  createRing,
  getRings,
  updateRing,
  deleteRing,
} from "./services/ringService";

const app = express();
const port = process.env.PORT || 3333;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);
/* app.options("*", cors()); */

app.post("/rings", async (req, res) => {
  try {
    const ring = await createRing(req.body);
    res.status(201).json(ring);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  }
});

app.get("/rings", async (req, res) => {
  try {
    const rings = await getRings();
    res.status(200).json(rings);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  }
});

app.put("/rings/:id", async (req, res) => {
  try {
    const ring = await updateRing(req.params.id, req.body);
    if (ring) {
      res.status(200).json(ring);
    } else {
      res.status(404).json({ error: "Anel não encontrado" });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  }
});

app.delete("/rings/:id", async (req, res) => {
  try {
    const ring = await deleteRing(req.params.id);
    if (ring) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: "Anel não encontrado" });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({
        error: "An unexpected error occurred",
        status: res.statusCode,
      });
    }
  }
});

connectToDatabase().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});
