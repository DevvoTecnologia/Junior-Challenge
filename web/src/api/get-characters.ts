import { api } from '@/lib/axios'

export type GetCharactersResponse = {
  id: string
  name: string
  description: string
  imageUrl: string
}[]

export async function getCharacters() {
  const response = await api.get<GetCharactersResponse>('/characters')
  return response.data
}
