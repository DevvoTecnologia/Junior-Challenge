import { RingRepository } from "@/repository/rings/repository"

type DeleteServiceRequest = {
  ringId: string
}

export class DeleteService {
  constructor(private ringRespository: RingRepository) { }

  async execute({ ringId }: DeleteServiceRequest) {
    const findRing = await this.ringRespository.findById(ringId)

    if (!findRing) {
      throw new Error()
    }

    await this.ringRespository.delete(ringId)
  }
}
