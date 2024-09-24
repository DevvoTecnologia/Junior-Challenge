import { api } from '../lib'

type DeleteRingRequest = {
  ringId: string
}

type DeleteRingResponse = void

export async function deleteRing({
  ringId  
}: DeleteRingRequest): Promise<DeleteRingResponse> {
  await api.delete(`/rings/${ringId}`)
}