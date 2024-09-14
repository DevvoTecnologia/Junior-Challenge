import { RingTypeORMRepository } from '@/repository/rings/typeorm'
import { DeleteService } from '@/services/ring/delete'
import { Request, Response } from 'express'
import { z } from 'zod'

export class DeleteController {
  async execute(request: Request, response: Response) {
    const deleteRingBody = z.object({
      id: z.string()
    })

    const { id } = deleteRingBody.parse(request.body)

    try {
      const ringRepository = new RingTypeORMRepository()
      const service = new DeleteService(ringRepository)

      await service.execute({
        ringId: id
      })

      return response.status(202).send();
    } catch(err) {
      console.error(err)
    }
  }
}