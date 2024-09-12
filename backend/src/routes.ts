import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { CriarCustomerService } from "./controllers/CriarAneisService";

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {

    fastify.get("/teste", async (request: FastifyRequest, reply: FastifyReply) => {
        return {ok: true}
    })

    fastify.post("/aneis", async(request: FastifyRequest, reply: FastifyReply) => {
        return new CriarCustomerService().handle(request, reply)
    })
    
}