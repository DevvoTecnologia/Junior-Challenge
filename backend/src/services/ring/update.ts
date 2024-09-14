import { Repository } from "typeorm"
import { Ring } from "../../models/ring"

type UpdateServiceRequest = {
  ringId: string
  data: {
    name: string,
    power: string,
    proprietor: string,
    forgedBy: string,
    image: string
  }
}

export class UpdateService {
  constructor(private ringRespository: Repository<Ring>) { }

  async execute({
    ringId,
    data: {
      forgedBy,
      image,
      name,
      power,
      proprietor
    }
  }: UpdateServiceRequest) {
    const ringById = await this.ringRespository.findOneBy({ id: ringId })

    if (!ringById) {
      throw new Error()
    }
    
    // TODO => Adicionar regra de negocio

    // const user = await this.usersRepository.updateServiceUser(userId, {
    //   email,
    //   nickname,
    //   name,
    //   password: passwordHash,
    //   details,
    // })

    // return {
    //   user,
    // }
  }
}
