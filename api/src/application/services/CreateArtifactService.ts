import { Artifact } from '@/domain/entities/Artifact'
import {
  CreateArtifactInput,
  CreateArtifactUseCase,
} from '@/domain/useCases/createArtifactUseCase'
import { ArtifactRepository } from '../contracts/artifactRepository'
import { SmithRepository } from '../contracts/smithRepository'
import { NotFoundError } from '../errors/NotFoundError'
import { BusinessRuleViolationError } from '../errors/BusinessRuleViolationError'

export class CreateArtifactService implements CreateArtifactUseCase {
  constructor(
    private readonly artifactRepository: ArtifactRepository,
    private readonly smithRepository: SmithRepository,
  ) {
    this.smithRepository = smithRepository
  }

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

    const artifact = new Artifact(
      input.name,
      input.power,
      input.imageUrl,
      input.bearer,
      input.forgedBy,
    )

    return this.artifactRepository.create(artifact)
  }
}
