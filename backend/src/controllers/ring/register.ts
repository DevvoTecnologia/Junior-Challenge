import { Request, Response } from 'express'
import { z } from 'zod'

export class RegisterRing {
  async execute(request: Request, response: Response) {
    const registerRingBody = z.object({
      name: z.string(),
      power: z.string(),
      proprietor: z.string(),
      forgedBy: z.string(),
      imagem: z.string().url()
    })

    const { forgedBy, imagem, name, power, proprietor } = registerRingBody.parse(request.body)

    try {
      console.log({
        forgedBy, imagem, name, power, proprietor
      })

      response.send({
        forgedBy, imagem, name, power, proprietor
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