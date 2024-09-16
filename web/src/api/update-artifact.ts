import { api } from '@/lib/axios'

export type UpdateArtifactRequest = {
  name: string
  power: string
  bearer: string
}

export async function updateArtifact(
  id: string,
  { name, power, bearer }: UpdateArtifactRequest,
) {
  await api.put(`/artifacts/${id}`, {
    name,
    power,
    bearer,
  })
}
