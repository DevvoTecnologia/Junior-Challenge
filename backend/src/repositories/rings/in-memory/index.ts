import { Ring } from "@/models/ring"
import { RingCreateInput, RingRepository } from "../ring-repository"
import { randomUUID } from "crypto"

export class RingInMemoryRepository implements RingRepository {
  rings: Ring[] = []

  async create(data: RingCreateInput) {
    const ring: Ring = {
      id: randomUUID().toString(),
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    this.rings.push(ring)
    return ring
  }

  async fetch() {
    return this.rings
  }

  async findById(id: string) {
    return this.rings.find(ring => ring.id === id) || null
  }

  async update(id: string, data: Partial<RingCreateInput>) {
    const ringIndex = this.rings.findIndex(ring => ring.id === id)

    const updatedRing = {
      ...this.rings[ringIndex],
      ...data,
    }

    this.rings[ringIndex] = updatedRing
    return updatedRing
  }

  async delete(id: string) {
    const ringIndex = this.rings.findIndex(ring => ring.id === id)

    this.rings.splice(ringIndex, 1)
  }
}
