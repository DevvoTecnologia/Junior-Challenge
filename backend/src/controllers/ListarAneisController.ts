import { FastifyReply, FastifyRequest } from "fastify"
import { ListarAneis } from "../services/ListarAneisService"

class ListarAneisController {
    async handle(request: FastifyRequest, reply: FastifyReply){
        const listarAneis = new ListarAneis()
        const aneis = await listarAneis.executa()

        reply.send(aneis)
    }
}

export {ListarAneisController}