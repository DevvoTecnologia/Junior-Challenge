import { Request, Response } from 'express'

import { RingTypeORMRepository } from '@/repository/rings/typeorm'
import { FetchService } from '@/services/ring/fetch'

export class FetchController {
  async execute(request: Request, response: Response) {
    try {
      const ringRepository = new RingTypeORMRepository()
      const service = new FetchService(ringRepository)

      const { rings } = await service.execute()

      return response.status(200).send({ rings });
    } catch (err) {
      console.error(err)
    }
  }
}