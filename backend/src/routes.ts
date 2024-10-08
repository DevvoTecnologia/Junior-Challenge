import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import prismaClient from "./prisma";
import { CriarAneisController } from "./controllers/CriarAneisController";
import { ListarAneisController } from "./controllers/ListarAneisController";
import {DeletarAneisController} from './controllers/DeletarAneisController'
import { AtualizarAneisController } from "./controllers/AtualizarAneisController";


export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {

    fastify.post("/aneis", async(request: FastifyRequest, reply: FastifyReply) => {
        return new CriarAneisController().handle(request, reply)
    })

    fastify.get("/listaAneis", async(request: FastifyRequest, reply: FastifyReply) => {
        return new ListarAneisController().handle(request, reply)
    })

    fastify.delete("/aneis", async(request: FastifyRequest, reply: FastifyReply) => {
        return new DeletarAneisController().handle(request, reply)
    })

    fastify.put("/aneis/:id", async (request: FastifyRequest, reply: FastifyReply) => {
        return new AtualizarAneisController().handle(request, reply);
    });

    fastify.get("/aneis/count", async (request: FastifyRequest, reply: FastifyReply) => {
        const { forjadoPor } = request.query as { forjadoPor: string };
    
        if (!forjadoPor) {
          return reply.status(400).send({ error: "forjadoPor é obrigatório" });
        }
    
        try {
          const count = await prismaClient.customer.count({
            where: { forjadoPor }
          });
          return reply.send({ count });
        } catch (error) {
          return reply.status(500).send({ error: "Erro ao contar anéis" });
        }
      });

}