import { Request, Response } from 'express'
import { z } from 'zod'

export class RegisterRing {
  async execute(request: Request, response: Response) {
    const updateRingBody = z.object({
      id: z.string(),
      name: z.string(),
      power: z.string(),
      proprietor: z.string(),
      forgedBy: z.string(),
      imagem: z.string().url()
    })

    const { id, forgedBy, imagem, name, power, proprietor } = updateRingBody.parse(request.body)

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