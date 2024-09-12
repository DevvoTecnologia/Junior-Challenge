import { Ring } from '@/types/ring'
import { api } from './api'
import { RingFormData } from '@/validators/ring-schema'

export const createRing = async (ringData: RingFormData): Promise<Ring> => {
  try {
    const response = await api.post<Ring>('/create-ring', ringData)
    return response.data
  } catch (error) {
    console.error('Erro ao criar o anel:', error)
    throw error
  }
}