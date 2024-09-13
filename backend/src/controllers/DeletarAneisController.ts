import { FastifyRequest, FastifyReply } from "fastify";
import { DeletarAneis } from "../services/DeletarAneis";

class DeletarAneisController{
    async handle(request: FastifyRequest, reply: FastifyReply){
        const {id} = request.query as {id: string}
        const AneisDeletar = new DeletarAneis()

        const aneis = await AneisDeletar.executa({id})

        reply.send(aneis)
    }
}

export {DeletarAneisController}