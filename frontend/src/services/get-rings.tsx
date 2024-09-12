import { Ring } from '@/types/ring'
import { api } from './api'

export const getRings = async (): Promise<Ring[]> => {
  try {
    const response = await api.get<Ring[]>('/rings')
    return response.data
  } catch (error) {
    console.error('Erro ao buscar os anéis:', error)
    throw error
  }
}