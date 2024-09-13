import { expect, describe, it, beforeAll, afterAll } from "vitest";
import { startServer } from "../../app";
import type { Server } from "http";

const BASE_URL = "http://localhost:3333";

describe("/rings", () => {
  let _server: Server;

  beforeAll(async () => {
    await new Promise((resolve) => {
      _server = startServer();
      _server.once("listening", resolve);
    });
  });

  afterAll(async () => {
    await new Promise((resolve) => {
      _server.close(() => console.log("Server is closed"));
      _server.once("close", resolve);
    });
  });

  describe("POST", () => {
    it("should create a ring given valid data", async () => {
      const data = {
        nome: "Narya, o anel do fogo",
        poder: "Seu portador ganha resistência ao fogo",
        portador: "Gandalf",
        forjadoPor: "Elfos",
        imagem: "",
      };

      const request = await fetch(`${BASE_URL}/users`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      expect(request.status).toBe(201);
    });

    it("should not create a user given any invalid data", async () => {
      const data = {
        nome: "Narya, o anel do fogo",
        poder: "Seu portador ganha resistência ao fogo",
        portador: "Gandalf",
        forjadoPor: "Eelfos",
        imagem: "",
      };

      const request = await fetch(`${BASE_URL}/users`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const response = await request.json();

      expect(request.status).toBe(400);
      expect(response).toStrictEqual({
        errors: [
          "ErroFormatoInvalido: O anel só pode ser forjado por Sauron, Elfos, Anões e Humanos!",
        ],
      });
    });

    it("should not create a ring if given ring already exists", async () => {
      const data = {
        nome: "Narya, o anel do fogo",
        poder: "Seu portador ganha resistência ao fogo",
        portador: "Gandalf",
        forjadoPor: "Elfos",
        imagem: "",
      };

      const request = await fetch(`${BASE_URL}/users`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const response = await request.json();

      expect(request.status).toBe(400);
      expect(response).toStrictEqual({
        errors: ["user document [12345678911] already exists!"],
      });
    });
  });

  describe("GET", () => {
    it("should get all rings data", async () => {
      const request = await fetch(`${BASE_URL}/rings`);

      const response = await request.json();

      const [firstRing] = response.rings

      expect(request.status).toBe(200);
      expect(firstRing).toHaveProperty("nome", "Narya, o anel do fogo");
      expect(firstRing).toHaveProperty("poder", "Seu portador ganha resistência ao fogo");
      expect(firstRing).toHaveProperty("portador", "Gandalf");
      expect(firstRing).toHaveProperty("forjadoPor", "Elfos");
      expect(firstRing).toHaveProperty("imagem", "");
      expect(firstRing).toHaveProperty("id");
    });
  });
});
