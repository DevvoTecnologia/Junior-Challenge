import { api } from '../lib'
import { Ring } from '../types'

type FetchRingResponse = Ring[]

export async function fetchRing(): Promise<FetchRingResponse> {
  const result = await api.get("/rings")

  return result.data
}