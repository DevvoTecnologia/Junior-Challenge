import { Artifact } from '@/domain/entities/Artifact'
import {
  CreateArtifactInput,
  CreateArtifactUseCase,
} from '@/domain/useCases/createArtifactUseCase'
import { ArtifactRepository } from '../contracts/artifactRepository'

export class CreateArtifactService implements CreateArtifactUseCase {
  constructor(private readonly artifactRepository: ArtifactRepository) {}

  async execute(input: CreateArtifactInput) {
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
