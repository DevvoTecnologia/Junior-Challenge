import { FastifyRequest, FastifyReply } from "fastify";

import { CriarAneis } from "../services/CriarAneis";

class CriarAneisController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const {nome, poder,portador, forjadoPor, imagem} = request.body as {nome: string, poder: string, portador: string, forjadoPor:string, imagem: string}

        const aneisService = new CriarAneis()
        const aneis = await aneisService.executa({nome, poder, portador, forjadoPor, imagem})

        reply.send(aneis)
    }
}

export {CriarAneisController}