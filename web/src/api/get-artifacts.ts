import { api } from '@/lib/axios'

export type GetArtifactsResponse = {
  id: string
  name: string
  power: string
  imageUrl: string
  bearer: string
  forgedBy: string
}[]

export async function getArtifacts() {
  const response = await api.get<GetArtifactsResponse>('/artifacts')
  return response.data
}
