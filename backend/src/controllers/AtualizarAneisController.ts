import { FastifyRequest, FastifyReply } from "fastify";
import { AtualizarAneis } from "../services/AtualizarAneis";

class AtualizarAneisController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as { id: string };
        const { nome, poder, portador, forjadoPor, imagem } = request.body as {
            nome?: string;
            poder?: string;
            portador?: string;
            forjadoPor?: string;
            imagem?: string;
        };

        if (!id) {
            return reply.status(400).send({ error: "ID do anel não foi fornecido" });
        }

        const aneisAtualizar = new AtualizarAneis();

        try {
            const aneis = await aneisAtualizar.executa({ id, nome, poder, portador, forjadoPor, imagem });
            reply.status(200).send(aneis);
        } catch (error) {
            const err = error as Error;
            reply.status(500).send({ error: err.message });
        }
    }
}

export { AtualizarAneisController };