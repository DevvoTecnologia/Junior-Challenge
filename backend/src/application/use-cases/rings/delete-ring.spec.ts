import { beforeEach, describe, expect, it, vitest } from "vitest"

import { RingsRepository } from "@/application/protocols/database"

import { IDeleteRingUseCase } from "@/domain/use-cases/rings"

import { InMemoryRingsRepository  } from "@/infra/database/in-memory"
import { DeleteRingUseCase } from "./delete-ring"

let ringsRepository: RingsRepository
let sut: IDeleteRingUseCase

describe("delete ring use case", () => {
    beforeEach(() => {
        ringsRepository = new InMemoryRingsRepository()

        ringsRepository.create({
          ringId: 'ring-id',
          forgerId: 'forger-id',
          image: 'image',
          name: 'name',
          power: 'power',
          proprietor: 'proprietor'
        })

        sut = new DeleteRingUseCase(ringsRepository)
    })

    it("should be able to delete a ring", async () => {
        expect(() => sut.execute({
          ringId: 'ring-id',
        })).toBeDefined()
    })

    it("should be able to throw error if ring not exists", async () => {
      expect(() => sut.execute({
        ringId: 'ring-id-not-exists',
      })).rejects.toThrow("Ring does not exist")
    })
    
    it("should be able to call rings repository with the correct values", async () => {
        const ringsRepositorySpy = vitest.spyOn(ringsRepository, 'delete')

        await sut.execute({
            ringId: 'ring-id',
        })

        expect(ringsRepositorySpy).toHaveBeenCalledWith({
            ringId: 'ring-id',
        })
    })
})