import { beforeEach, describe, expect, it, vitest } from "vitest"

import { ForgersRepository, RingsRepository } from "@/application/protocols/database"

import { IUpdateRingUseCase } from "@/domain/use-cases/rings"
import { Ring } from "@/domain/entities"

import { InMemoryRingsRepository, InMemoryForgersRepository } from "@/infra/database/in-memory"
import { UpdateRingUseCase } from "./update-ring"

let forgersRepository: ForgersRepository
let ringsRepository: RingsRepository
let sut: IUpdateRingUseCase

describe("update ring use case", () => {
    beforeEach(() => {
        forgersRepository = new InMemoryForgersRepository()
        ringsRepository = new InMemoryRingsRepository()

        forgersRepository.create({
            forgerId: 'forger-id',
            name: 'name',
            maxRings: 3
        })

        
        ringsRepository.create({
          ringId: 'ring-id',
          forgerId: 'forger-id',
          image: 'image',
          name: 'name',
          power: 'power',
          proprietor: 'proprietor'
        })

        sut = new UpdateRingUseCase(forgersRepository, ringsRepository)
    })

    it("should be able to update a ring", async () => {
        const ring = await sut.execute({
          ringId: 'ring-id',
          name: "name-01"
        })

        expect(ring.ringId).toBe('ring-id')
        expect(ring.name).toBe('name-01')
        expect(ring.power).toBe('power')
        expect(ring.proprietor).toBe('proprietor')
        expect(ring.image).toBe('image')
        expect(ring.forgerId).toBe('forger-id')
        expect(ring.createdAt).toBeDefined()
        expect(ring.updatedAt).toBeDefined()
    })

    it("should be able to throw error if ring not exists", async () => {
        expect(() => sut.execute({
            ringId: "ring-id-not-exist",
            power: "power"
        })).rejects.toThrow("Ring does not exist")
    })

    it("should be able to call forgers repository with the correct values", async () => {
        const forgersRepositorySpy = vitest.spyOn(forgersRepository, 'findById')

        await sut.execute({
            ringId: 'ring-id',
            forgerId: 'forger-id',
            image: 'image',
            name: 'name',
            power: 'power',
            proprietor: 'proprietor'
        })

        expect(forgersRepositorySpy).toHaveBeenCalledWith({
            forgerId: 'forger-id',
        })
    })

    it("should be able to throw if forger not exists", async () => {
        vitest.spyOn(forgersRepository, 'findById').mockImplementationOnce(async () => null)

        expect(() => sut.execute({
            ringId: 'ring-id',
            forgerId: 'forger-id',
            image: 'image',
            name: 'name',
            power: 'power',
            proprietor: 'proprietor'
        })).rejects.toThrow('Forger not found')
    })

    it("should be able to throw if forger can not create any more rings", async () => {
        const ring: Ring = {
            ringId: 'ring-id',
            forgerId: 'forger-id',
            image: 'image',
            name: 'name',
            power: 'power',
            proprietor: 'proprietor',
            createdAt: new Date(),
            updatedAt: new Date()
        }
        const forger = {
            name: "name",
            forgerId: "forger-id",
            rings: [ring],
            maxRings: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        }

        vitest.spyOn(forgersRepository, 'findById').mockImplementationOnce(async () => forger)   

        expect(() =>  sut.execute({
                ringId: 'ring-id',
                forgerId: 'forger-id',
                image: 'image',
                name: 'name',
                power: 'power',
                proprietor: 'proprietor'
            }) 
        ).rejects.toThrow("Forger already has many rings")
    })

    it("should be able to call rings repository with the correct values", async () => {
        const ringsRepositorySpy = vitest.spyOn(ringsRepository, 'update')

        await sut.execute({
            ringId: 'ring-id',
            forgerId: 'forger-id',
            image: 'image',
            name: 'name',
            power: 'power',
            proprietor: 'proprietor'
        })

        expect(ringsRepositorySpy).toHaveBeenCalledWith({
            ringId: 'ring-id',
            forgerId: 'forger-id',
            image: 'image',
            name: 'name',
            power: 'power',
            proprietor: 'proprietor'
        })
    })

})