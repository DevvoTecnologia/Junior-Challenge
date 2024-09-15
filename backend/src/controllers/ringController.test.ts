import express from "express";
import request from "supertest";
import ringRoutes from "../routes/ringRoutes";
import * as ringService from "../services/ringService";

const app = express();
app.use(express.json());
app.use("/api/rings", ringRoutes);

jest.mock("../services/ringService");

describe("Ring Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /api/rings", () => {
    it("should create a new ring", async () => {
      const newRing = {
        name: "One Ring",
        power: "Invisibility",
        holder: "Frodo",
        forgedBy: "Sauron",
        image: "http://example.com/image.jpg",
      };

      (ringService.createRing as jest.Mock).mockResolvedValue(newRing);

      const response = await request(app).post("/api/rings").send(newRing);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(newRing);
    });

    it("should return 400 if required fields are missing", async () => {
      const response = await request(app).post("/api/rings").send({});

      expect(response.status).toBe(400);
      expect(response.body.message).toBe(
        "All fields are required to create a ring."
      );
    });
  });

  describe("GET /api/rings", () => {
    it("should return all rings", async () => {
      const rings = [
        {
          _id: "1",
          name: "One Ring",
          power: "Invisibility",
          holder: "Frodo",
          forgedBy: "Sauron",
          image: "http://example.com/image.jpg",
        },
      ];

      (ringService.getRings as jest.Mock).mockResolvedValue(rings);

      const response = await request(app).get("/api/rings");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(rings);
    });
  });

  describe("PUT /api/rings/:id", () => {
    it("should update a ring", async () => {
      const updatedRing = {
        _id: "1",
        name: "Updated Ring",
        power: "Invisibility",
        holder: "Frodo",
        forgedBy: "Sauron",
        image: "http://example.com/image.jpg",
      };

      (ringService.updateRing as jest.Mock).mockResolvedValue(updatedRing);

      const response = await request(app).put("/api/rings/1").send(updatedRing);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(updatedRing);
    });

    it("should return 404 if the ring is not found", async () => {
      (ringService.updateRing as jest.Mock).mockRejectedValue(
        new Error("Ring not found.")
      );

      const response = await request(app).put("/api/rings/1").send({});

      expect(response.status).toBe(404);
      expect(response.body.error).toBe("Ring not found.");
    });
  });

  describe("DELETE /api/rings/:id", () => {
    it("should delete a ring", async () => {
      const deletedRing = {
        _id: "1",
        name: "One Ring",
        power: "Invisibility",
        holder: "Frodo",
        forgedBy: "Sauron",
        image: "http://example.com/image.jpg",
      };

      (ringService.deleteRing as jest.Mock).mockResolvedValue(deletedRing);

      const response = await request(app).delete("/api/rings/1");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(deletedRing);
    });

    it("should return 404 if the ring is not found", async () => {
      (ringService.deleteRing as jest.Mock).mockRejectedValue(
        new Error("Ring not found.")
      );

      const response = await request(app).delete("/api/rings/1");

      expect(response.status).toBe(404);
      expect(response.body.error).toBe("Ring not found.");
    });
  });
});
