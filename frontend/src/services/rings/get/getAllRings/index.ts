import api from '../../../api'
import { IPropsResponseAllRings } from './types'

export default async function getAllRings(): Promise<IPropsResponseAllRings> {
  const response = await api().get('/rings')

  return response.data
}
