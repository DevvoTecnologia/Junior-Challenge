export type UpdateArtifactInput = {
  id: string
  name: string
  power: string
  forgedBy?: string
  bearer?: string
  imageUrl: string
}
export interface UpdateArtifactUseCase {
  execute: (input: UpdateArtifactInput) => Promise<void>
}
