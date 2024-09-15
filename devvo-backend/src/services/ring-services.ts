import { Forger } from "../@types";
import { validateForgerLimit } from "../lib/validateMaxForger";
import { RingRepository } from "../repositories/ring/ring-repository";
import {
  RingCreateInputParameters,
  RingCreatedReturn,
} from "../repositories/ring/types-ring-repository";
import { UserServices } from "./user-services";

interface IRingServices {
  createRing(
    token: string,
    data: RingCreateInputParameters,
  ): Promise<RingCreatedReturn>;
  findAll(token: string): Promise<RingCreatedReturn[]>;
  findOne(id: string, token: string): Promise<RingCreatedReturn>;
  updateRing(
    id: string,
    token: string,
    data: RingCreateInputParameters,
  ): Promise<RingCreatedReturn>;
  deleteRing(id: string, token: string): Promise<void>;
}

export class RingServices implements IRingServices {
  constructor(
    private readonly ringRepository = new RingRepository(),
    private readonly userService = new UserServices(),
  ) {}

  async createRing(
    token: string,
    data: RingCreateInputParameters,
  ): Promise<RingCreatedReturn> {
    const verifyToken = await this.userService.findByToken(token);

    if (!token) {
      throw new Error("Usuário deve estar logado");
    }

    if (!verifyToken) {
      throw new Error("Token inválido");
    }

    const { name, power, forgedBy, image, carrier } = data;

    if (!name || !power || !forgedBy || !carrier) {
      throw new Error(
        "Os campos de Nome, poder, portador e Forjador são obrigatórios",
      );
    }

    const ringsQntForgedBy = await this.verifyForgerQuantity(
      forgedBy.toUpperCase() as Forger,
    );

    if (!ringsQntForgedBy) {
      throw new Error("Quantidade de anéis por forjador ultrapassada.");
    }

    const newRing = await this.ringRepository.create({
      name,
      power,
      forgedBy,
      carrier,
      image,
    });

    return newRing;
  }

  async findAll(token: string): Promise<RingCreatedReturn[]> {
    const verifyToken = await this.userService.findByToken(token);

    if (!token) {
      throw new Error("Usuário deve estar logado");
    }

    if (!verifyToken) {
      throw new Error("Token inválido");
    }

    const allRings = await this.ringRepository.findAll();
    return allRings;
  }

  async findOne(id: string, token: string): Promise<RingCreatedReturn> {
    const ring = await this.ringRepository.findById(id);
    const verifyToken = await this.userService.findByToken(token);

    if (!token) {
      throw new Error("Usuário deve estar logado");
    }

    if (!verifyToken) {
      throw new Error("Token inválido");
    }

    if (!ring) {
      throw new Error("Anel não encontrado.");
    }

    return ring;
  }

  async updateRing(
    id: string,
    token: string,
    data: RingCreateInputParameters,
  ): Promise<RingCreatedReturn> {
    const findingRing = await this.ringRepository.findById(id);

    const verifyToken = await this.userService.findByToken(token);

    if (!token) {
      throw new Error("Usuário deve estar logado");
    }

    if (!verifyToken) {
      throw new Error("Token inválido");
    }

    if (!findingRing) {
      throw new Error("Anel não encontrado para a atualização.");
    }

    const updatedRingService = await this.ringRepository.update(id, data);

    return updatedRingService;
  }

  async deleteRing(id: string, token: string): Promise<void> {
    const findingRing = await this.ringRepository.findById(id);
    const verifyToken = await this.userService.findByToken(token);
    if (!token) {
      throw new Error("Usuário deve estar logado");
    }

    if (!verifyToken) {
      throw new Error("Token inválido");
    }

    if (!findingRing) {
      throw new Error("Anel não encontrado para exclusão.");
    }

    return await this.ringRepository.delete(id);
  }

  async verifyForgerQuantity(forgedBy: Forger): Promise<boolean> {
    const ringsForgedBy = await this.ringRepository.findForgerQuantityLimit(
      forgedBy,
    );

    const validatingLimit = validateForgerLimit(
      forgedBy as Forger,
      ringsForgedBy,
    );

    return validatingLimit;
  }
}
