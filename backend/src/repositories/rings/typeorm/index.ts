import { typeOrm } from "@/database/typeorm/data-source"
import { Ring } from "@/models/ring"
import { RingCreateInput, RingRepository } from "../ring-repository"

export class RingTypeORMRepository implements RingRepository {
  private ringRepository = typeOrm.getRepository(Ring)

  async create({ forgedBy, image, name, power, proprietor }: RingCreateInput) {
    const ring = this.ringRepository.create({
      forgedBy, image, name, power, proprietor
    })

    await this.ringRepository.save(ring)


    return ring
  }

  async delete(id: string) {
    const ring = await this.ringRepository.findOneBy({ id })

    await this.ringRepository.remove(ring)
  }

  async fetch() {
    const rings = await this.ringRepository.find()

    return rings
  }

  async update(id: string, data: Partial<RingCreateInput>): Promise<Ring> {
    const ring = await this.ringRepository.findOneBy({ id })

    Object.assign(ring, data)

    await this.ringRepository.save(ring)

    return ring
  }

  async findById(id: string): Promise<Ring> {
    const ring = await this.ringRepository.findOneBy({ id })

    return ring
  }
}
