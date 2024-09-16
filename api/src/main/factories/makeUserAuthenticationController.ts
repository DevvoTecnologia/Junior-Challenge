import { UserAuthenticationService } from '@/application/services/UserAuthenticationService'
import { CrypterRepo } from '@/infra/repositories/CrypterRepository'
import { UserTypeORMRepository } from '@/infra/repositories/UserRepository'
import { Controller } from '@/presentation/contracts/controller'
import { UserAuthenticationController } from '@/presentation/controllers/UserAuthenticationController'

export const makeUserAuthenticationController = (): Controller => {
  const userRepository = new UserTypeORMRepository()
  const crypterRepository = new CrypterRepo()
  const service = new UserAuthenticationService(
    userRepository,
    crypterRepository,
  )
  const controller = new UserAuthenticationController(service)
  return controller
}
