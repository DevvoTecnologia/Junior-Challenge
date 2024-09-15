import { Artifact } from '@/domain/entities/Artifact'
import {
  CreateArtifactInput,
  CreateArtifactUseCase,
} from '@/domain/useCases/createArtifactUseCase'
import { ArtifactRepository } from '../contracts/artifactRepository'
import { SmithRepository } from '../contracts/smithRepository'
import { NotFoundError } from '../errors/NotFoundError'
import { BusinessRuleViolationError } from '../errors/BusinessRuleViolationError'
import { ImageGeneratorRepository } from '../contracts/imageGeneratorRepository'
import { ImageCloudRepository } from '../contracts/imageCloudRepository'

export class CreateArtifactService implements CreateArtifactUseCase {
  constructor(
    private readonly artifactRepository: ArtifactRepository,
    private readonly smithRepository: SmithRepository,
    private readonly imageGeneratorRepository: ImageGeneratorRepository,
    private readonly imageCloudRepository: ImageCloudRepository,
  ) {}

  async execute(input: CreateArtifactInput) {
    const smith = await this.smithRepository.findById(input.forgedBy)

    if (!smith) {
      throw new NotFoundError('Smith')
    }

    const forgedItemsCount = await this.artifactRepository.countBySmithId(
      input.forgedBy,
    )

    if (forgedItemsCount >= smith.itemLimit) {
      throw new BusinessRuleViolationError(
        `Limite de ${smith.itemLimit} itens excedido para ${smith.name}`,
      )
    }

    const generatedImagePath = await this.imageGeneratorRepository.generate(
      input.name,
      input.power,
    )

    const imageUrl =
      await this.imageCloudRepository.uploadImage(generatedImagePath)

    const artifact = new Artifact(
      input.name,
      input.power,
      imageUrl,
      input.bearer,
      input.forgedBy,
    )

    return this.artifactRepository.create(artifact)
  }
}
