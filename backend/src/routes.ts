import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { CriarAneisController } from "./controllers/CriarAneisController";
import { ListarAneisController } from "./controllers/ListarAneisController";
import {DeletarAneisController} from './controllers/DeletarAneisController'


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
    
}