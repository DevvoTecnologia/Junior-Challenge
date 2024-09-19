import { CreateUserService } from '@/application/services/CreateUserService'
import { CrypterRepo } from '@/infra/repositories/CrypterRepository'
import { UserTypeORMRepository } from '@/infra/repositories/UserRepository'
import { Controller } from '@/presentation/contracts/controller'
import { CreateUserController } from '@/presentation/controllers/CreateUserController'

export const makeCreateUserController = (): Controller => {
  const userRepository = new UserTypeORMRepository()
  const crypterRepository = new CrypterRepo()
  const service = new CreateUserService(userRepository, crypterRepository)
  const controller = new CreateUserController(service)
  return controller
}
