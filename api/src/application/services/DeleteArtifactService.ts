import { DeleteArtifactUseCase } from '@/domain/useCases/deleteArtifactUseCase'
import { ArtifactRepository } from '../contracts/artifactRepository'

export class DeleteArtifactService implements DeleteArtifactUseCase {
  constructor(private readonly artifactRepository: ArtifactRepository) {}

  async execute(id: string) {
    await this.artifactRepository.delete(id)
  }
}
