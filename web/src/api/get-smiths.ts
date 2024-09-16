import { api } from '@/lib/axios'

export type GetSmithsResponse = {
  id: string
  name: string
  description: string
  itemLimit: number
}[]

export async function getSmiths() {
  const response = await api.get<GetSmithsResponse>('/smiths')
  return response.data
}
