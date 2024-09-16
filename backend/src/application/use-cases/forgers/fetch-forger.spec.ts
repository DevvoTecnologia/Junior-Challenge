import { beforeEach, describe, expect, it } from "vitest";

import { InMemoryForgersRepository  } from "@/infra/database/in-memory";

import { ForgersRepository } from "@/application/protocols/database";

import { IFetchForgerUseCase } from "@/domain/use-cases/forgers";
import { FetchForgerUseCase } from "./fetch-forger";

let forgersRepository: ForgersRepository
let sut: IFetchForgerUseCase

describe("fetch forgers use case", () => {
    beforeEach(() => {
        forgersRepository = new InMemoryForgersRepository()

        sut = new FetchForgerUseCase(forgersRepository)
    })

    it("should be able to fetch all forger", async () => {
        for (let i = 0; i < 10; i++) {
          forgersRepository.create({
            forgerId: "1",
            name: "name",
            maxRings: 1,
          })
        }

        const forgers = await sut.execute()

        expect(forgers).toHaveLength(10)
    })
})