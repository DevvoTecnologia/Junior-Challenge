import { api } from '@/lib/axios'

export async function deleteArtifact(id: string) {
  await api.delete(`/artifacts/${id}`)
}
