  import { api } from '../lib'
  import { Forger } from '../types/forger'

  type FetchForgerResponse = Forger[]

  export async function fetchForger(): Promise<FetchForgerResponse> {
    const result = await api.get("/forgers")

    return result.data
  }