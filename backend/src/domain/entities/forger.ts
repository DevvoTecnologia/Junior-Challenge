import { Ring } from "./ring"

export interface Forger {
    forgerId: string
    name: string
    maxRings: number
    rings: Ring[]
    createdAt: Date
    updatedAt: Date
}