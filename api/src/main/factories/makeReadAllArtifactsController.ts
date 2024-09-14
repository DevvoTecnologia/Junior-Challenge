import { ReadAllArtifactsService } from '@/application/services/ReadAllArtifactsService'
import { ArtifactTypeORMRepository } from '@/infra/repositories/AtifactRepository'
import { Controller } from '@/presentation/contracts/controller'
import { ReadAllArtifactsController } from '@/presentation/controllers/ReadAllArtifactsController'

export const makeReadAllArtifactsController = (): Controller => {
  const repo = new ArtifactTypeORMRepository()
  const service = new ReadAllArtifactsService(repo)
  const controller = new ReadAllArtifactsController(service)
  return controller
}
