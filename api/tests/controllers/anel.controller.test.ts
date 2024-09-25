import request from "supertest";
import express from "express";
import AnelController from "../../src/controllers/anel.controller";
import { Anel } from "../../src/models";

const app = express();
app.use(express.json());

app.get("/anel", AnelController.listar);
app.get("/anel/:id", AnelController.buscarPorId);
app.post("/anel", AnelController.criar);
app.put("/anel/:id", AnelController.atualizar);
app.delete("/anel/:id", AnelController.deletar);

jest.mock("../../src/models", () => ({
	Anel: {
		find: jest.fn(),
		findById: jest.fn(),
		countDocuments: jest.fn(),
		create: jest.fn(),
		findByIdAndUpdate: jest.fn(),
		findByIdAndDelete: jest.fn(),
	},
}));

describe("AnelController", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	test("Deve listar todos os anéis", async () => {
		const mockAnel = [{ _id: "1", nome: "Anel 1" }];
		(Anel.find as jest.Mock).mockResolvedValue(mockAnel);

		const response = await request(app).get("/anel");
		expect(response.status).toBe(200);
		expect(response.body).toEqual(mockAnel);
	});

	test("Deve buscar um anel por ID", async () => {
		const mockAnel = { _id: "1", nome: "Anel 1" };
		(Anel.findById as jest.Mock).mockResolvedValue(mockAnel);

		const response = await request(app).get("/anel/1");
		expect(response.status).toBe(200);
		expect(response.body).toEqual(mockAnel);
	});

	test("Deve criar um novo anel", async () => {
		const novoAnel = { nome: "Anel 1", forjadoPor: "Elfos" };
		const mockAnel = { ...novoAnel, imagem: "http://example.com/image.jpg" };
		(Anel.countDocuments as jest.Mock).mockResolvedValue(0);
		(Anel.create as jest.Mock).mockResolvedValue(mockAnel);

		const response = await request(app).post("/anel").send(novoAnel);
		expect(response.status).toBe(201);
		expect(response.body).toEqual(mockAnel);
	});

	test("Deve atualizar um anel", async () => {
		const atualizadoAnel = { nome: "Anel Atualizado" };
		(Anel.findByIdAndUpdate as jest.Mock).mockResolvedValue({ _id: "1", ...atualizadoAnel });

		const response = await request(app).put("/anel/1").send(atualizadoAnel);
		expect(response.status).toBe(200);
		expect(response.body).toEqual({ _id: "1", ...atualizadoAnel });
	});

	test("Deve deletar um anel", async () => {
		(Anel.findByIdAndDelete as jest.Mock).mockResolvedValue({ _id: "1" });

		const response = await request(app).delete("/anel/1");
		expect(response.status).toBe(204);
	});

	test("Deve retornar erro ao buscar anel por ID não encontrado", async () => {
		(Anel.findById as jest.Mock).mockResolvedValue(null);

		const response = await request(app).get("/anel/999");
		expect(response.status).toBe(404);
		expect(response.body).toEqual({ message: "Anel não encontrado" });
	});

	test("Deve retornar erro ao criar anel com limite atingido", async () => {
		const novoAnel = { nome: "Anel 1", forjadoPor: "Elfos" };
		(Anel.countDocuments as jest.Mock).mockResolvedValue(3);

		const response = await request(app).post("/anel").send(novoAnel);
		expect(response.status).toBe(400);
		expect(response.body).toEqual({ message: "Limite de anéis atingido" });
	});
});
