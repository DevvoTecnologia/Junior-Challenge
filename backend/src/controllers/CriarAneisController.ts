import { FastifyRequest, FastifyReply } from "fastify";
import { CriarAneis } from "../services/CriarAneis";

class CriarAneisController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { nome, poder, portador, forjadoPor, imagem } = request.body as {
            nome: string;
            poder: string;
            portador: string;
            forjadoPor: "Elfos" | "Anões" | "Homens" | "Sauron"; // Garantir que o tipo está correto
            imagem: string;
        };

        const criarAneisService = new CriarAneis();

        try {
            const novoAnel = await criarAneisService.executa({ nome, poder, portador, forjadoPor, imagem });
            reply.status(201).send({ message: "Anel criado com sucesso", novoAnel });
        } catch (error) {
            const err = error as Error;
            reply.status(400).send({ error: err.message });
        }
    }
}

export { CriarAneisController };

