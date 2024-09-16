import { ForgersRepository } from "@/application/protocols/database"
import { Forger } from "@/domain/entities"
import { randomUUID } from "crypto"

export class InMemoryForgersRepository implements ForgersRepository {
    private database: Forger[] = []

    async create(input: ForgersRepository.Create.Input): ForgersRepository.Create.Output {
        const forger: Forger = {
            forgerId: input.forgerId || randomUUID(),
            name: input.name,
            rings: [],
            maxRings: input.maxRings,
            createdAt: new Date(),
            updatedAt: new Date(),
        }

        this.database.push(forger)

        return forger
    }

    async findById(input: ForgersRepository.FindById.Input): ForgersRepository.FindById.Output {
        const forger = this.database.find(item => item.forgerId === input.forgerId)

        return forger || null
    }

    async fetch(): ForgersRepository.Fetch.Output {
        const forgers = this.database
        
        return forgers
    }
}