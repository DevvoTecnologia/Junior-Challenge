import { ReadAllCharactersService } from '@/application/services/ReadAllCharactersService'
import { CharacterTypeORMRepository } from '@/infra/repositories/CharacterRepository'
import { Controller } from '@/presentation/contracts/controller'
import { ReadAllCharactersController } from '@/presentation/controllers/ReadAllCharactersController'

export const makeReadAllCharactersController = (): Controller => {
  const repo = new CharacterTypeORMRepository()
  const service = new ReadAllCharactersService(repo)
  const controller = new ReadAllCharactersController(service)
  return controller
}
