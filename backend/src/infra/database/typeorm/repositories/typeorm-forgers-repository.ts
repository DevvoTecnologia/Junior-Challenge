import { ForgersRepository } from "@/application/protocols/database";
import { typeOrm } from "@/infra/database/typeorm";
import { Forger } from "@/infra/database/typeorm/models";

export class ForgersTypeOrmRepository implements ForgersRepository {
  private forgerRepository = typeOrm.getRepository<Forger>(Forger)

  async create(input: ForgersRepository.Create.Input): ForgersRepository.Create.Output {
    const forger = this.forgerRepository.create({
      name: input.name,
      maxRings: input.maxRings,
      rings: []
    })

    await this.forgerRepository.save(forger)

    const ringCorrectReturnFormat = forger.rings?.map(item => ({
      ringId: item.id,
      name: item.name,
      power: item.power,
      proprietor: item.proprietor,
      image: item.image,
      forgerId: item.forger.id,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt
    }))

    const forgerCorrectReturnFormat = {
      forgerId: forger.id,
      name: forger.name,
      maxRings: forger.maxRings,
      rings: ringCorrectReturnFormat || [],
      createdAt: forger.createdAt,
      updatedAt: forger.updatedAt
    }

    return forgerCorrectReturnFormat
  }

  async findById(input: ForgersRepository.FindById.Input): ForgersRepository.FindById.Output {
      const forger = await this.forgerRepository.findOne({
        where: {
          id: input.forgerId
        },
        relations: {
          rings: true
        }
      }) as Forger

      if (!forger) return null

      const ringCorrectReturnFormat = forger.rings?.map(item => ({
        ringId: item.id,
        name: item.name,
        power: item.power,
        proprietor: item.proprietor,
        image: item.image,
        forgerId: forger.id,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt
      }))
  
      const forgerCorrectReturnFormat = {
        forgerId: forger.id,
        name: forger.name,
        maxRings: forger.maxRings,
        rings: ringCorrectReturnFormat || [],
        createdAt: forger.createdAt,
        updatedAt: forger.updatedAt
      }
  
      return forger ? forgerCorrectReturnFormat : null 
  }

  async fetch(): ForgersRepository.Fetch.Output {
    const forgers = await this.forgerRepository.find()

    const forgersCorrectFormat = forgers.map(item =>  { 
      const ringsCorrectReturnFormat = item.rings?.map(item => ({
        ringId: item.id,
        name: item.name,
        power: item.power,
        proprietor: item.proprietor,
        image: item.image,
        forgerId: item.forger.id,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt
      }))

      return {
        forgerId: item.id,
        name: item.name,
        maxRings: item.maxRings,
        rings: ringsCorrectReturnFormat,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt
      }}
    )
    
    return forgersCorrectFormat
  }
}