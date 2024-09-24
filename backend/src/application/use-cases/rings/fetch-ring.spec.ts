import { beforeEach, describe, expect, it } from "vitest";

import { InMemoryRingsRepository  } from "@/infra/database/in-memory";

import { RingsRepository } from "@/application/protocols/database";
import { IFetchRingUseCase } from "@/domain/use-cases/rings";

import { FetchRingUseCase } from "./fetch-ring";

let ringsRepository: RingsRepository
let sut: IFetchRingUseCase

describe("fetch ring use case", () => {
    beforeEach(() => {
        ringsRepository = new InMemoryRingsRepository()

        sut = new FetchRingUseCase(ringsRepository)
    })

    it("should be able to fetch all rings", async () => {
        for (let i = 0; i < 10; i++) {
          ringsRepository.create({
            ringId: 'ring-id',
            forgerId: 'forger-id',
            image: 'image',
            name: 'name',
            power: 'power',
            proprietor: 'proprietor'
          })
        }

        const rings = await sut.execute()

        expect(rings).toHaveLength(10)
    })
})