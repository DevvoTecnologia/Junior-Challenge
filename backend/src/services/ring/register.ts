import { RingRepository } from "@/repositories/rings/ring-repository"
type RegisterServiceRequest = {
  name: string,
  power: string,
  proprietor: string,
  forgedBy: string,
  image: string
}

export class RegisterService {
  constructor(private ringRespository: RingRepository) { }

  async execute({ forgedBy, image, name, power, proprietor }: RegisterServiceRequest) {
    // const emailAlreadyExists = await this.ringRespository.findBy({})

    // TODO => Adicionar regra de negocio

    // return {
    //   user,
    // }
  }
}
