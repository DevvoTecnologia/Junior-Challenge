import { fetchForger } from "../api/fetch-forger"
import { Forger } from "../types/forger"

type GetForgerByIdProps = {
  forgerId: string
}

export async function getForgerNameById({ forgerId }: GetForgerByIdProps) {
  try {
    const forgers: Forger[] = await fetchForger()

    const forger = forgers.find(item => item.forgerId === forgerId)

    return forger?.name
  } catch (error) {
    console.error('Erro ao buscar o nome do forger:', error)
    return undefined
  }
}