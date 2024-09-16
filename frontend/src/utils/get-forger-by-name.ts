import { fetchForger } from '../api/fetch-forger'
import { Forger } from '../types/forger'

type GetForgerByNameProps = {
  name: string
}

export async function getForgerByName({ name }: GetForgerByNameProps) {
  try {
    const forgers: Forger[] = await fetchForger()
    
    const forger = forgers.find(item => item.name === name)
    
    return forger?.forgerId
  } catch (error) {
    
    console.error('Erro ao buscar os forgers:', error)
    return undefined
  }
}
