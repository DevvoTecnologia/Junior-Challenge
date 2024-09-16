import { api } from '../lib'
import { Ring } from '../types'

type CreateRingRequest = {
  ring: {
    name: string
    power: string
    proprietor: string
    forgerId: string
    image: string
  }
}

type CreateRingResponse = {
  ring: Ring
}

export async function createRing({
  ring
}: CreateRingRequest): Promise<CreateRingResponse> {
  const result = await api.post("/rings", {
    name: ring.name,
    power: ring.power,
    proprietor: ring.proprietor,
    image: ring.image,
    forgerId: ring.forgerId,
  })

  return result.data
}