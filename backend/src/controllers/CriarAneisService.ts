import { FastifyRequest, FastifyReply } from "fastify";

import { CriarAneis } from "../services/CriarAneis";

class CriarCustomerService {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const {nome, poder,portador, forjadoPor} = request.body as {nome: string, poder: string, portador: string, forjadoPor:string}

        const aneisService = new CriarAneis()
        const aneis = await aneisService.executa({nome, poder, portador, forjadoPor})

        reply.send(aneis)
    }
}

export {CriarCustomerService}