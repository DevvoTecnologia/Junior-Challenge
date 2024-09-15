import { CreateArtifactService } from '@/application/services/CreateArtifactService'
import { ArtifactTypeORMRepository } from '@/infra/repositories/AtifactRepository'
import { CloudinaryImageCloudRepository } from '@/infra/repositories/ImageCloudRepository'
import { StableDiffusionImageGeneratorRepository } from '@/infra/repositories/ImageGeneratorRepository'
import { SmithTypeORMRepository } from '@/infra/repositories/SmithRepository'
import { Controller } from '@/presentation/contracts/controller'
import { CreateArtifactController } from '@/presentation/controllers/CreateArtifactController'

export const makeCreateArtifactController = (): Controller => {
  const artifactRepository = new ArtifactTypeORMRepository()
  const smithRepository = new SmithTypeORMRepository()
  const imageGeneratorRepository = new StableDiffusionImageGeneratorRepository()
  const imageCloudRepository = new CloudinaryImageCloudRepository()
  const service = new CreateArtifactService(
    artifactRepository,
    smithRepository,
    imageGeneratorRepository,
    imageCloudRepository,
  )
  const controller = new CreateArtifactController(service)
  return controller
}
