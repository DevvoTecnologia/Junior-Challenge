import { RingNotExistError } from '@/services/errors/ring-not-exist'
import { Request, Response } from 'express'
import { z, ZodError } from 'zod'

export class UpdaterController {
  async execute(request: Request, response: Response) {
    const updateRingBody = z.object({
      name: z.string(),
      power: z.string(),
      proprietor: z.string(),
      forgedBy: z.string(),
      imagem: z.string().url()
    })

    const updateRingParams = z.object({
      ringId: z.string().uuid()
    })

    const { forgedBy, imagem, name, power, proprietor } = updateRingBody.parse(request.body)
    const { ringId } = updateRingParams.parse(request.params)

    try {
      // TODO => finalizar regra de negocio
      console.log({
        forgedBy, imagem, name, power, proprietor
      })

      response.send({
        forgedBy, imagem, name, power, proprietor
      })
    } catch(err) {
      if (err instanceof RingNotExistError) {
        return response.status(400).send({ message: err.message })
      }

      if (err instanceof ZodError) {
        return response
          .status(400)
          .send({ message: "Validation error.", issues: err.format() })
      }
    
      return response.status(500).send({ message: "Internal server error." })
    }
  }
}