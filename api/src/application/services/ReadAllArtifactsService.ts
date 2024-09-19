import { ReadAllArtifactsUseCase } from '@/domain/useCases/readAllArtifactsUseCase'
import { ArtifactRepository } from '../contracts/artifactRepository'
import { ArtifactDTO } from '../dto/ArtifactDTO'

export class ReadAllArtifactsService implements ReadAllArtifactsUseCase {
  constructor(private readonly artifactRepository: ArtifactRepository) {}

  async execute(): Promise<ArtifactDTO[]> {
    const artifacts = this.artifactRepository.findAll()
    return artifacts
  }
}
