import { Ring } from "@/models/ring"

export interface RingRepository {
  create(data: RingCreateInput): Promise<Ring>
  delete(id: string): Promise<void>
  fetch(): Promise<Ring[]>
  update(id: string, data: Partial<RingCreateInput>): Promise<Ring>
  findById(id: string): Promise<Ring | null>
}

export type RingCreateInput = {
  name: string,
  power: string,
  proprietor: string,
  forgedBy: string,
  image: string
}

