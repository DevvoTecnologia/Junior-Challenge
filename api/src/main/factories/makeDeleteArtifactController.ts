import { DeleteArtifactService } from '@/application/services/DeleteArtifactService'
import { ArtifactTypeORMRepository } from '@/infra/repositories/AtifactRepository'
import { Controller } from '@/presentation/contracts/controller'
import { DeleteArtifactController } from '@/presentation/controllers/DeleteArtifactController'

export const makeDeleteArtifactController = (): Controller => {
  const repo = new ArtifactTypeORMRepository()
  const service = new DeleteArtifactService(repo)
  const controller = new DeleteArtifactController(service)
  return controller
}
