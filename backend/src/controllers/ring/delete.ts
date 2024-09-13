import { Request, Response } from 'express'
import { z } from 'zod'

export class DeleteRing {
  async execute(request: Request, response: Response) {
    const deleteRingBody = z.object({
      id: z.string()
    })

    const { id } = deleteRingBody.parse(request.body)

    try {
      console.log({
        id
      })

      response.send({
        id
      })
    } catch(err) {
      console.error(err)
    }
  }
}

// nome: Nome do anel (ex: "Narya, o anel do fogo").
// poder: Uma breve descrição do poder do anel (ex: "Seu portador ganha resistência ao fogo").
// portador: O nome do portador atual (Ex: Gandalf).
// forjadoPor: Quem forjou o anel (ex: Elfos).
// imagem: URL de uma imagem genérica do anel.