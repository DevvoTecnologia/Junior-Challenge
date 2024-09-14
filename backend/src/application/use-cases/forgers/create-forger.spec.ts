import { beforeEach, describe, expect, it, vitest } from "vitest"
import { CreateForgerUseCase } from "./create-forger"
import { ForgersRepository } from "@/application/protocols/database"
import { ICreateForgerUseCase } from "@/domain/use-cases/forgers"
import { InMemoryForgersRepository } from "@/infra/database/in-memory"

let forgersRepository: ForgersRepository
let sut: ICreateForgerUseCase

describe("create forger use case", () => {
    beforeEach(() => {
        forgersRepository = new InMemoryForgersRepository()
        sut = new CreateForgerUseCase(forgersRepository)
    })

    it("should be able to create a forger", async () => {
        const forger = await sut.execute({
            forgerId: "forget-id",
            name: "name",
            maxRings: 3,
        })

        expect(forger.forgerId).toBe('forget-id')
        expect(forger.name).toBe('name')
        expect(forger.maxRings).toBe(3)
        expect(forger.createdAt).toBeDefined()
        expect(forger.updatedAt).toBeDefined()
    })

    it("should be able to call rings repository with the correct values", async () => {
        const forgersRepositorySpy = vitest.spyOn(forgersRepository, 'create')

        await sut.execute({
            forgerId: "forget-id",
            name: "name",
            maxRings: 3,
        })

        expect(forgersRepositorySpy).toHaveBeenCalledWith({
            forgerId: "forget-id",
            name: "name",
            maxRings: 3,
        })
    })
})