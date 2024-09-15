import { ForgersRepository } from "@/application/protocols/database";
import { typeOrm } from "@/infra/typeorm";
import { Forger } from "@/infra/typeorm/models";

export class ForgersTypeOrmRepository implements ForgersRepository {
  private forgerRepository = typeOrm.getRepository(Forger)

  async create(input: ForgersRepository.Create.Input): ForgersRepository.Create.Output {
    const forger = this.forgerRepository.create({
      name: input.name,
      maxRings: input.maxRings,
    })

    await this.forgerRepository.save(forger)

    const ringCorrectReturnFormat = forger.rings.map(item => ({
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
      rings: ringCorrectReturnFormat,
      createdAt: forger.createdAt,
      updatedAt: forger.updatedAt
    }

    return forgerCorrectReturnFormat
  }

  async findById(input: ForgersRepository.FindById.Input): ForgersRepository.FindById.Output {
      const forger = await this.forgerRepository.findOneBy({ id: input.forgerId }) as Forger

      const ringCorrectReturnFormat = forger.rings.map(item => ({
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
        rings: ringCorrectReturnFormat,
        createdAt: forger.createdAt,
        updatedAt: forger.updatedAt
      }
  
      return forger ? forgerCorrectReturnFormat : null 
  }
}