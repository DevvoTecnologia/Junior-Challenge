import api from '../../../api'
import { IPropsDeleteRing, IPropsResponseDeleteRing } from './types'

export default async function deleteRing({
  id
}: IPropsDeleteRing): Promise<IPropsResponseDeleteRing> {
  const response = await api().delete(`/ring/${id}`)

  return response.data
}
