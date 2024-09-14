
import { beforeEach, describe, expect, it } from "vitest"

import { RingInMemoryRepository } from "@/repositories/rings/in-memory"
import { DeleteService } from "./delete"
import { RingNotExistError } from "../errors/ring-not-exist"

let ringsRepository: RingInMemoryRepository
let sup: DeleteService

describe("Delete ring service", () => {
  beforeEach(() => {
    ringsRepository = new RingInMemoryRepository()
    sup = new DeleteService(ringsRepository)
  })

  it("should be able to delete ring", async () => {
    ringsRepository.rings.push({
      id: "ring_01",
      name: "Narya, o anel do fogo",
      power: "Seu portador ganha resistência ao fogo",
      proprietor: "Gandalf",
      forgedBy: "Elfos",
      image: "URL de uma imagem genérica do anel.",
      createdAt: new Date(),
      updatedAt: new Date()
    })

    await sup.execute({ ringId: "ring_01" })

    expect(ringsRepository.rings).toHaveLength(0)
  })

  it("should be able to return error post not exist", async () => {
    expect(() => sup.execute({
      ringId: "not_exist_id"
    })
    ).rejects.toBeInstanceOf(RingNotExistError)
  })
})
