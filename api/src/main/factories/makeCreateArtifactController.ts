import { CreateArtifactService } from '@/application/services/CreateArtifactService'
import { ArtifactTypeORMRepository } from '@/infra/repositories/AtifactRepository'
import { Controller } from '@/presentation/contracts/controller'
import { CreateArtifactController } from '@/presentation/controllers/CreateArtifactController'

export const makeCreateArtifactController = (): Controller => {
  const repo = new ArtifactTypeORMRepository()
  const service = new CreateArtifactService(repo)
  const controller = new CreateArtifactController(service)
  return controller
}
