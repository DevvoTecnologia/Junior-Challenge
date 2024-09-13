import { IRings } from '../../../../interfaces/IRings'

export interface IPropsEditRing {
  id: string
  name?: string
  power?: string
  owner?: string
  forgedBy?: string
  imagem?: string
}

export interface IPropsResponseEditRing {
  ring: IRings
}
