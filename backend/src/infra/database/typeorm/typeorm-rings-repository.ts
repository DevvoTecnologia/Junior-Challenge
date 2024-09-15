import { RingsRepository } from "@/application/protocols/database"
import { Ring } from "@/infra/typeorm/models"
import { typeOrm } from "@/infra/typeorm"

export class RingTypeORMRepository implements RingsRepository {
  private ringRepository = typeOrm.getRepository(Ring)

  async create(input: RingsRepository.Create.Input): RingsRepository.Create.Output {
    const ring = this.ringRepository.create({
      name: input.name,
      image: input.image,
      power: input.power,
      forger: {
        id: input.forgerId
      }
    })
    
    await this.ringRepository.save(ring)

    const ringCorrectReturnFormat = {
      ringId: ring.id,
      name: ring.name,
      power: ring.power,
      proprietor: ring.proprietor,
      image: ring.image,
      forgerId: ring.forger.id,
      createdAt: ring.createdAt,
      updatedAt: ring.updatedAt
    }
    
    return ringCorrectReturnFormat
  }

  async delete(input: RingsRepository.Delete.Input): RingsRepository.Delete.Output {
    const ring = await this.ringRepository.findOneBy({ id: input.ringId }) as Ring

    await this.ringRepository.remove(ring)
  }

  async fetch(): RingsRepository.Fetch.Output {  
    const rings = await this.ringRepository.find()

    const ringsCorrectReturnFormat = rings.map(item => ({
      ringId: item.id,
      name: item.name,
      power: item.power,
      proprietor: item.proprietor,
      image: item.image,
      forgerId: item.forger.id,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt
    }))

    return ringsCorrectReturnFormat
  }

  async update(input: RingsRepository.Update.Input): RingsRepository.Update.Output {
    const ring = await this.ringRepository.findOneBy({ id: input.ringId }) as Ring

    Object.assign(ring, input)

    await this.ringRepository.save(ring)

    const ringCorrectReturnFormat = {
      ringId: ring.id,
      name: ring.name,
      power: ring.power,
      proprietor: ring.proprietor,
      image: ring.image,
      forgerId: ring.forger.id,
      createdAt: ring.createdAt,
      updatedAt: ring.updatedAt
    }

    return ringCorrectReturnFormat
  }

  async findById(input: RingsRepository.FindById.Input): RingsRepository.FindById.Output {
    const ring = await this.ringRepository.findOneBy({ id: input.ringId })

    return ring ? {
      ringId: ring.id,
      name: ring.name,
      power: ring.power,
      proprietor: ring.proprietor,
      image: ring.image,
      forgerId: ring.forger.id,
      createdAt: ring.createdAt,
      updatedAt: ring.updatedAt
    } : null 
  }
}
