import { RingTypeORMRepository } from '@/repositories/rings/typeorm'
import { RegisterService } from '@/services/ring/register'
import { Request, Response } from 'express'
import { z, ZodError } from 'zod'

export class RegisterController {
  async execute(request: Request, response: Response) {
    const registerRingBody = z.object({
      name: z.string(),
      power: z.string(),
      proprietor: z.string(),
      forgedBy: z.string(),
      image: z.string().url()
    })

    const { forgedBy, image, name, power, proprietor } = registerRingBody.parse(request.body)

    try {
      const ringRepository = new RingTypeORMRepository()
      const service = new RegisterService(ringRepository)

      // TODO => finalizar regra de negocio

      // const { rings } = await useCase.execute()

      // return response.status(200).send({ rings })
    } catch(err) {
      // if (err instanceof RingNotExistError) {
      //   return response.status(400).send({ message: err.message })
      // }

      if (err instanceof ZodError) {
        return response
          .status(400)
          .send({ message: "Validation error.", issues: err.format() })
      }
    
      return response.status(500).send({ message: "Internal server error." })
    }
  }
}

// nome: Nome do anel (ex: "Narya, o anel do fogo").
// poder: Uma breve descrição do poder do anel (ex: "Seu portador ganha resistência ao fogo").
// portador: O nome do portador atual (Ex: Gandalf).
// forjadoPor: Quem forjou o anel (ex: Elfos).
// image: URL de uma image genérica do anel.