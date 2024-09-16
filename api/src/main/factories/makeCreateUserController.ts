import { CreateUserService } from '@/application/services/CreateUserService'
import { UserTypeORMRepository } from '@/infra/repositories/UserRepository'
import { Controller } from '@/presentation/contracts/controller'
import { CreateUserController } from '@/presentation/controllers/CreateUserController'

export const makeCreateUserController = (): Controller => {
  const repo = new UserTypeORMRepository()
  const service = new CreateUserService(repo)
  const controller = new CreateUserController(service)
  return controller
}
