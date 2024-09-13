import api from '../../../api'
import { IPropsResponseAllForgers } from './types'

export default async function getForgers(): Promise<IPropsResponseAllForgers> {
  const response = await api().get('/forgers')

  return response.data
}
