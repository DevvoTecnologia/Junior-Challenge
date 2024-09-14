import { ArtifactDTO } from '@/application/dto/ArtifactDTO'

export type CreateArtifactInput = {
  name: string
  power: string
  forgedBy?: string
  bearer?: string
  imageUrl: string
}

export interface CreateArtifactUseCase {
  execute: (input: CreateArtifactInput) => Promise<ArtifactDTO>
}
