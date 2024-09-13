export interface IForgers {
  id: string
  name: string
  maximumNumberRings: number
  quantityForgedRings: number
}

export interface IPropsResponseAllForgers {
  rings: Array<IForgers>
}
