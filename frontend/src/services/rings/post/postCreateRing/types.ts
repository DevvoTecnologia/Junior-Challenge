import { IRings } from '../../../../interfaces/IRings'

export interface IPropsCreateRing {
  name: string
  power: string
  owner: string
  forgedBy: string
  imagem: string
}

export interface IPropsResponseCreateRing {
  ring: IRings
}
