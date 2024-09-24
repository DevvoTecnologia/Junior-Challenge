import { api } from '../lib'
import { Ring } from '../types'

type UpdateRingRequest = {
  ring: {
    ringId: string
    name?: string
    power?: string
    proprietor?: string
    forgerId?: string
    image?: string
  }
}

type UpdateRingResponse = {
  ring: Ring
}

export async function updateRing({
  ring
}: UpdateRingRequest): Promise<UpdateRingResponse> {
  const result = await api.put(`/rings/${ring.ringId}`, {
    name: ring.name,
    power: ring.power,
    proprietor: ring.proprietor,
    image: ring.image,
    forgerId: ring.forgerId,
  })

  return result.data
}