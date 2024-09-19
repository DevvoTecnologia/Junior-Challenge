import { ReadAllSmithsService } from '@/application/services/ReadAllSmithsService'
import { SmithTypeORMRepository } from '@/infra/repositories/SmithRepository'
import { Controller } from '@/presentation/contracts/controller'
import { ReadAllSmithsController } from '@/presentation/controllers/ReadAllSmithsController'

export const makeReadAllSmithsController = (): Controller => {
  const repo = new SmithTypeORMRepository()
  const service = new ReadAllSmithsService(repo)
  const controller = new ReadAllSmithsController(service)
  return controller
}
