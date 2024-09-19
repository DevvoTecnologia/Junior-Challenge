import { api } from '@/lib/axios'

export type CreateArtifactRequest = {
  name: string
  power: string
  bearer: string
  forgedBy: string
}

export type CreateArtifactResponse = {
  id: string
  name: string
  power: string
  imageUrl: string
  bearer: string
  forgedBy: string
}

export async function createArtifact({
  name,
  power,
  bearer,
  forgedBy,
}: CreateArtifactRequest) {
  const response = await api.post<CreateArtifactResponse>('/artifacts', {
    name,
    power,
    bearer,
    forgedBy,
  })
  return response.data
}
