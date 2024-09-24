import { RingsRepository } from "@/application/protocols/database"
import { Ring } from "@/domain/entities"
import { randomUUID } from "crypto"

export class InMemoryRingsRepository implements RingsRepository {
    private database: Ring[] = []

    async create(input: RingsRepository.Create.Input): RingsRepository.Create.Output {
        const ring: Ring = {
            ringId: input.ringId || randomUUID(),
            forgerId: input.forgerId,
            image: input.image,
            name: input.name,
            power: input.power,
            proprietor: input.proprietor,
            createdAt: new Date(),
            updatedAt: new Date()
        }

        this.database.push(ring)

        return ring
    }

    async findById(input: RingsRepository.FindById.Input): RingsRepository.FindById.Output {
        const ring = this.database.find(item => item.ringId === input.ringId)

        return ring || null
    }

    async update(input: RingsRepository.Update.Input): RingsRepository.Update.Output {
        const ringIndex = this.database.findIndex(item => item.ringId === input.ringId)

        const ring = this.database[ringIndex]

        const updatedRing: Ring = {
            ringId: input.ringId,
            name: input.name ?? ring.name,
            image: input.image ?? ring.image,
            forgerId: input.forgerId ?? ring.forgerId,
            power: input.power ?? ring.power,
            proprietor: input.proprietor ?? ring.proprietor,
            createdAt: ring.createdAt,
            updatedAt: new Date()
        }

        this.database[ringIndex] = updatedRing
        return updatedRing
    }

    async delete(input: RingsRepository.Delete.Input): RingsRepository.Delete.Output {
        const newDatabase = this.database.filter(item => item.ringId !== input.ringId)

        this.database = newDatabase
    }

    async fetch(): RingsRepository.Fetch.Output {
        const rings = this.database
        
        return rings
    }
}