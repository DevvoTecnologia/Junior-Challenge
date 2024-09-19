import { UpdateArtifactService } from '@/application/services/UpdateArtifactService'
import { ArtifactTypeORMRepository } from '@/infra/repositories/AtifactRepository'
import { Controller } from '@/presentation/contracts/controller'
import { UpdateArtifactController } from '@/presentation/controllers/UpdateArtifactController'

export const makeUpdateArtifactController = (): Controller => {
  const repo = new ArtifactTypeORMRepository()
  const service = new UpdateArtifactService(repo)
  const controller = new UpdateArtifactController(service)
  return controller
}
