import { RingRepository } from "@/repositories/rings/ring-repository"
import { RingNotExistError } from "../errors/ring-not-exist"

type DeleteServiceRequest = {
  ringId: string
}

export class DeleteService {
  constructor(private ringRespository: RingRepository) { }

  async execute({ ringId }: DeleteServiceRequest) {
    const findRing = await this.ringRespository.findById(ringId)

    if (!findRing) {
      throw new RingNotExistError()
    }

    await this.ringRespository.delete(ringId)
  }
}
