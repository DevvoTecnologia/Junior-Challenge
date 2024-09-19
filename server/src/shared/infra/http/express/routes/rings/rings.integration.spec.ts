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
        id: "1",
        nome: "Narya, o anel do fogo",
        poder: "Seu portador ganha resistência ao fogo",
        portador: "Gandalf",
        forjadoPor: "Elfos",
        imagem: "",
      };

      const request = await fetch(`${BASE_URL}/rings`, {
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
        id: "1",
        nome: "Nenya, o anel da água",
        poder: "Preservação e proteção",
        portador: "Galadriel",
        forjadoPor: "Eelfos",
        imagem: "",
      };

      const request = await fetch(`${BASE_URL}/rings`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const response = await request.json();

      expect(request.status).toBe(400);
      expect(response).toStrictEqual({ "error": "ErroValorInvalido: o valor forjadoPor não pode ser do tipo [Eelfos]!" });
    });

    it("should not create a ring if given ring already exists", async () => {
      const data = {
        id: "1",
        nome: "Narya, o anel do fogo",
        poder: "Seu portador ganha resistência ao fogo",
        portador: "Gandalf",
        forjadoPor: "Elfos",
        imagem: "",
      };

      const request = await fetch(`${BASE_URL}/rings`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const response = await request.json();

      expect(request.status).toBe(400);
      expect(response).toStrictEqual({ "error": "O nome do anel [Narya, o anel do fogo] já existe!" });
    });
  });

  describe("GET", () => {
    it("should get all rings", async () => {
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

  describe("PUT", () => {
    it.todo("should edit data from a ring", async () => {
      const data = {
        id: "1",
        nome: "Narya, o anel do fogo",
        poder: "Seu portador ganha resistência ao fogo",
        portador: "Gandalf",
        forjadoPor: "Elfos",
        imagem: "",
      };

      const request = await fetch(`${BASE_URL}/rings`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      expect(request.status).toBe(200);
    });

    it("should not edit data from a ring if it doesn't exists", async () => {
      const data = {
        nome: "Não existe"
      };

      const request = await fetch(`${BASE_URL}/rings`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const response = await request.json()

      expect(request.status).toBe(400);
      expect(response).toStrictEqual({ "error": "O anel [Não existe] não foi encontrado!" })
    });
  });

  describe("DELETE", () => {
    it("should delete a ring", async () => {
      const data = {
        nome: "Narya, o anel do fogo"
      };
  
      const request = await fetch(`${BASE_URL}/rings`, {
        method: "DELETE",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      expect(request.status).toBe(200);
    });
  
    it("should not delete a ring if it doesn't exists", async () => {
      const data = {
        nome: "Não existe"
      };
  
      const request = await fetch(`${BASE_URL}/rings`, {
        method: "DELETE",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const response = await request.json()
  
      expect(request.status).toBe(400);
      expect(response).toStrictEqual({ "error": "O anel [Não existe] não foi encontrado!" })
    });
  });
});


