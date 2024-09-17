import { Result } from "../../../shared/Result";
import { Ring } from "../domain/Rings";
import { CreateRingDTO } from "../dtos/CreateRingDTO";
import { IRingsRepository } from "../repository/IRingsRepository";
import { injectable, inject } from "tsyringe"

@injectable()
export class RingsService {
  private ringsRepository;

  constructor(
    @inject("RingsRepository")
    ringsRepository: IRingsRepository
  ) {
    this.ringsRepository = ringsRepository;
  }

  async create(data: CreateRingDTO) {
    const limits = {
      "Sauron": 1,
      "Elfos": 3,
      "Anões": 5,
      "Humanos": 7
    }

    const limit = limits[data.forjadoPor]

    const forjadoPorRings = await this.ringsRepository.getAllRingsbyForjadoPor(data.forjadoPor)

    if (forjadoPorRings.length >= limit) {
      if (data.forjadoPor === "Sauron") return Result.fail(`Sauron só pode ter 1 anel`)

      return Result.fail(`Os ${data.forjadoPor.toLocaleLowerCase()} não podem ter mais de ${limit} aneis!`)
    }

    const nameAlreadyExists = await this.ringsRepository.getRingbyName(data.nome)

    if (nameAlreadyExists) {
      return Result.fail(`O nome do anel [${data.nome}] já existe!`)
    }

    const ringOrError = Ring.create(data)

    if (ringOrError.isFailure) {
      return Result.fail(ringOrError.error)
    }

    const ring = ringOrError.getValue()

    return Result.ok(await this.ringsRepository.save(ring));
  }

  async getAll() {
    return await this.ringsRepository.getAllRings()
  }

  async getByName({ nome }: { nome: string }) {
    const ring = await this.ringsRepository.getRingbyName(nome)

    if (!ring) {
      return Result.fail<Ring>(`O anel [${nome}] não foi encontrado!`)
    }

    return Result.ok<Ring>(ring)
  }

  async getById({ id }: { id: string }) {

  }

  async edit(data: CreateRingDTO & { id: string }) {
    const nameAlreadyExists = await this.ringsRepository.getRingbyName(data.nome)

    if (nameAlreadyExists) {
      return Result.fail(`O nome do anel [${data.nome}] já existe!`)
    }

    const ringOrError = Ring.create(data)

    if (ringOrError.isFailure) {
      return Result.fail(ringOrError.error)
    }

    const ring = ringOrError.getValue()

    return Result.ok(await this.ringsRepository.save(ring));
  }

  async delete({ id }: { id: string }) {
    return await this.ringsRepository.delete(id)
  }
}
