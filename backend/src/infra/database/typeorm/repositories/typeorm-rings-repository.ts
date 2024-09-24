import { RingsRepository } from "@/application/protocols/database"
import { Ring } from "@/infra/database/typeorm/models"
import { typeOrm } from "@/infra/database/typeorm"

export class RingTypeORMRepository implements RingsRepository {
  private ringRepository = typeOrm.getRepository(Ring)

  async create(input: RingsRepository.Create.Input): RingsRepository.Create.Output {
    const ring = this.ringRepository.create({
      name: input.name,
      image: input.image,
      power: input.power,
      proprietor: input.proprietor,
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
    const rings = await this.ringRepository.find({
      relations: {
        forger: true
      }
    })

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
    const ringProperties: Record<string, any> = {}

    if (input.name) ringProperties.name = input.name

    if (input.name) ringProperties.name = input.name

    if (input.power) ringProperties.power = input.power

    if (input.proprietor) ringProperties.proprietor = input.proprietor

    if (input.image) ringProperties.image = input.image

    if (input.forgerId) ringProperties.forgerId = input.forgerId

    const prevRing = await this.ringRepository.findOne({
      where: {
        id: input.ringId
      },
      relations: {
        forger: true
      }
    })

    const updatedRing = await this.ringRepository.save({
      id: input.ringId,
      updatedAt: new Date(),
      ...ringProperties
    })
    const ring = Object.assign(prevRing || {}, updatedRing)

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
    const ring = await this.ringRepository.findOne({
      where: {
        id: input.ringId,
      },
      relations: {
        forger: true
      }
    })

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
