import { CreateArtifactService } from '@/application/services/CreateArtifactService'
import { ArtifactTypeORMRepository } from '@/infra/repositories/AtifactRepository'
import { SmithTypeORMRepository } from '@/infra/repositories/SmithRepository'
import { Controller } from '@/presentation/contracts/controller'
import { CreateArtifactController } from '@/presentation/controllers/CreateArtifactController'

export const makeCreateArtifactController = (): Controller => {
  const artifactRepository = new ArtifactTypeORMRepository()
  const smithRepository = new SmithTypeORMRepository()
  const service = new CreateArtifactService(artifactRepository, smithRepository)
  const controller = new CreateArtifactController(service)
  return controller
}
