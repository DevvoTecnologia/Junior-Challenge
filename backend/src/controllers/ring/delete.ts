import { RingTypeORMRepository } from '@/repositories/rings/typeorm'
import { RingNotExistError } from '@/services/errors/ring-not-exist'
import { DeleteService } from '@/services/ring/delete'
import { Request, Response } from 'express'
import { z, ZodError } from 'zod'

export class DeleteController {
  async execute(request: Request, response: Response) {
    const deleteRingParams = z.object({
      ringId: z.string()
    })

    const { ringId } = deleteRingParams.parse(request.params)

    try {
      const ringRepository = new RingTypeORMRepository()
      const service = new DeleteService(ringRepository)

      await service.execute({
        ringId
      })

      return response.status(202).send()
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