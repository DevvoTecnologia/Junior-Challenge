
import { beforeEach, describe, expect, it } from "vitest"

import { RingInMemoryRepository } from "@/repositories/rings/in-memory"
import { FetchService } from "./fetch"
import { randomUUID } from "crypto"

let ringsRepository: RingInMemoryRepository
let sup: FetchService

describe("Fetch rings service", () => {
  beforeEach(() => {
    ringsRepository = new RingInMemoryRepository()
    sup = new FetchService(ringsRepository)
  })

  it("should be able to fetch rings", async () => {
    for (let i = 0; i < 10; i++) {
      ringsRepository.rings.push({
        id: randomUUID(),
        name: "Narya, o anel do fogo",
        power: "Seu portador ganha resistência ao fogo",
        proprietor: "Gandalf",
        forgedBy: "Elfos",
        image: "URL de uma imagem genérica do anel.",
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }

    const { rings } = await sup.execute()

    expect(rings).toHaveLength(10)
  })
})
