import {
  UpdateArtifactInput,
  UpdateArtifactUseCase,
} from '@/domain/useCases/updateArtifactUseCase'
import { ArtifactRepository } from '../contracts/artifactRepository'
import { Artifact } from '@/domain/entities/Artifact'

export class UpdateArtifactService implements UpdateArtifactUseCase {
  constructor(private readonly artifactRepository: ArtifactRepository) {}

  async execute(input: UpdateArtifactInput): Promise<void> {
    const { id, imageUrl, name, power, bearer, forgedBy } = input
    const artifact = new Artifact(name, power, imageUrl, bearer, forgedBy, id)
    await this.artifactRepository.update(artifact)
  }
}
