import { RingRepository } from "../../repositories/ring/ring-repository";
import {
  RingCreateInput,
  RingCreatedReturn,
} from "../../repositories/ring/types-ring-repository";
import { RingServices } from "../ring-services";
import { UserServices } from "../user-services";

jest.mock("../../repositories/ring/ring-repository");
jest.mock("../../services/user-services");

describe("RingServices with JWT", () => {
  let ringServices: RingServices;
  let mockRingRepository: jest.Mocked<RingRepository>;
  let mockUserServices: jest.Mocked<UserServices>;

  const token = "valid-token";

  const data: RingCreateInput = {
    name: "Sauroner, o anel do fogo",
    power: "Seu portador ganha resistência ao fogo",
    carrier: "Sauroner",
    forgedBy: "SAURON",
    image: "url_para_a_imagem.jpg",
  };

  const objectMocked: RingCreatedReturn = {
    id: "866c7441-cf37-453a-a417-b12bdc5eeeab",
    name: "Sauroner, o anel do fogo",
    power: "Seu portador ganha resistência ao fogo",
    carrierId: "84f86998-cc3f-4b1c-88e4-40c6e91b6aba",
    forgedBy: "SAURON",
    image: "url_para_a_imagem.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
    carrier: {
      id: "84f86998-cc3f-4b1c-88e4-40c6e91b6aba",
      name: "Sauroner",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  };

  const objectForUpdateMocked: RingCreatedReturn = {
    id: "866c7441-cf37-453a-a417-b12bdc5eeeab",
    name: "atualizando nome",
    power: "atualizando descrição",
    carrierId: "84f86998-cc3f-4b1c-88e4-40c6e91b6aba",
    forgedBy: "SAURON",
    image: "url_para_a_imagem.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
    carrier: {
      id: "84f86998-cc3f-4b1c-88e4-40c6e91b6aba",
      name: "fulano",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  };

  const dataForUpdate: RingCreateInput = {
    name: "atualizando nome",
    power: "atualizando descrição",
    carrier: "fulano",
    forgedBy: "SAURON",
    image: "url_para_a_imagem.jpg",
  };

  beforeEach(() => {
    mockRingRepository = new RingRepository() as jest.Mocked<RingRepository>;
    mockUserServices = new UserServices() as jest.Mocked<UserServices>;

    // mocking create
    mockRingRepository.create.mockResolvedValue(objectMocked);

    // mocking findForgerQuantityLimit
    mockRingRepository.findForgerQuantityLimit.mockResolvedValue(0);

    // mocking findAll
    mockRingRepository.findAll.mockResolvedValue([objectMocked]);

    // mocking findById
    mockRingRepository.findById.mockResolvedValue(objectMocked);

    // mocking update
    mockRingRepository.update.mockResolvedValue(objectForUpdateMocked);

    // mocking delete
    mockRingRepository.delete.mockResolvedValue(undefined);

    // Mocking user service token validation
    mockUserServices.findByToken.mockResolvedValue({ id: "user-id" });

    ringServices = new RingServices(mockRingRepository, mockUserServices);
  });

  test("should create a ring successfully with valid token", async () => {
    const result = await ringServices.createRing(token, data);

    expect(mockUserServices.findByToken).toHaveBeenCalledWith(token);
    expect(result).toMatchObject(objectMocked);
  });

  test("should throw an error if the token is missing", async () => {
    const result = ringServices.createRing("", data);

    await expect(result).rejects.toThrow("Usuário deve estar logado");
  });

  test("should throw an error if token is invalid", async () => {
    mockUserServices.findByToken.mockResolvedValue(null);

    const result = ringServices.createRing(token, data);

    await expect(result).rejects.toThrow("Token inválido");
  });

  test("should throw an error if the forger quantity limit is exceeded", async () => {
    mockRingRepository.findForgerQuantityLimit.mockResolvedValue(1);

    const result = ringServices.createRing(token, data);

    await expect(result).rejects.toThrow(
      "Quantidade de anéis por forjador ultrapassada.",
    );
  });

  test("should find all rings with valid token", async () => {
    const rings = [objectMocked];

    const result = await ringServices.findAll(token);

    expect(mockUserServices.findByToken).toHaveBeenCalledWith(token);
    expect(result).toEqual(rings);
  });

  test("should throw an error if user is not logged in for findAll", async () => {
    const result = ringServices.findAll("");

    await expect(result).rejects.toThrow("Usuário deve estar logado");
  });

  test("should find a ring by id with valid token", async () => {
    const ring = objectMocked;

    const result = await ringServices.findOne(ring.id, token);

    expect(mockUserServices.findByToken).toHaveBeenCalledWith(token);
    expect(result).toEqual(ring);
  });

  test("should update a ring with valid token", async () => {
    const result = await ringServices.updateRing("", token, dataForUpdate);

    expect(mockUserServices.findByToken).toHaveBeenCalledWith(token);
    expect(result).toMatchObject(objectForUpdateMocked);
  });

  test("should throw an error if the ring is not found for update", async () => {
    mockRingRepository.findById.mockResolvedValue(null);

    const result = ringServices.updateRing("", token, dataForUpdate);

    await expect(result).rejects.toThrow(
      "Anel não encontrado para a atualização.",
    );
  });

  test("should delete a ring with valid token", async () => {
    const result = await ringServices.deleteRing(objectMocked.id, token);

    expect(mockUserServices.findByToken).toHaveBeenCalledWith(token);
    expect(result).toBeUndefined();
  });

  test("should throw an error if the ring is not found for deletion", async () => {
    mockRingRepository.findById.mockResolvedValue(null);

    const result = ringServices.deleteRing("some-id", token);

    await expect(result).rejects.toThrow("Anel não encontrado para exclusão.");
  });
});
