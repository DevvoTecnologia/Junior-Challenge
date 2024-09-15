import { beforeEach, describe, expect, it } from "vitest";
import { CreateRingDTO } from "../dtos/CreateRingDTO";
import { RingsService } from "./RingsService";
import { RingsRepositoryInMemory } from "../repository/InMemory/RingsRepositoryInMemory";

describe("Users service", () => {
  let ringsRepositoryInMemory: RingsRepositoryInMemory;
  let ringsService: RingsService;

  beforeEach(() => {
    ringsRepositoryInMemory = new RingsRepositoryInMemory([]);
    ringsService = new RingsService(ringsRepositoryInMemory);
  });

  it("should create a ring", async () => {
    const data = {
      nome: "Narya, o anel do fogo",
      poder: "Seu portador ganha resistência ao fogo",
      portador: "Gandalf",
      forjadoPor: "Elfos",
      imagem: "",
    } as CreateRingDTO;

    const result = await ringsService.create(data);

    expect(result.getValue()).toBeUndefined();
  });

  it("should not create more than 1 ring for Sauron", async () => {
    const data = [
      {
        nome: "Anel 1",
        poder: "Poder 1",
        portador: "Gandalf",
        forjadoPor: "Sauron",
        imagem: "",
      },
      {
        nome: "Anel 2",
        poder: "Poder 2",
        portador: "Gandalf",
        forjadoPor: "Sauron",
        imagem: "",
      }
    ] as CreateRingDTO[];

    const firstResult = await ringsService.create(data[0]);
    const secondResult = await ringsService.create(data[0]);

    expect(firstResult.isSuccess).toBeTruthy();
    expect(secondResult.isSuccess).toBeFalsy();
    expect(secondResult.error).toBe("Sauron só pode ter 1 anel")
  });

  it("should not create more than 3 rings for Elves", async () => {
    const data: CreateRingDTO[] = Array(4).fill(null).map((_, index) => ({
      nome: `Anel ${index}`,
      poder: `Poder ${index}`,
      portador: "Gandalf",
      forjadoPor: "Elfos",
      imagem: "",
    }))

    const firstResult = await ringsService.create(data[0]);
    const secondResult = await ringsService.create(data[1]);
    const thirdResult = await ringsService.create(data[2]);
    const fourthResult = await ringsService.create(data[3]);

    expect(firstResult.isSuccess).toBeTruthy();
    expect(secondResult.isSuccess).toBeTruthy();
    expect(thirdResult.isSuccess).toBeTruthy();
    expect(fourthResult.isSuccess).toBeFalsy();
    expect(fourthResult.error).toBe("Os elfos não podem ter mais de 3 aneis!")
  });

  it("should not create more than 5 rings for Dwarfs", async () => {
    const data: CreateRingDTO[] = Array(6).fill(null).map((_, index) => ({
      nome: `Anel ${index}`,
      poder: `Poder ${index}`,
      portador: "Gandalf",
      forjadoPor: "Anões",
      imagem: "",
    }))

    const results = await Promise.all(data.map((ring) => ringsService.create(ring)))

    // Ensure the first 5 creations are successful
    results.forEach(result => {
      expect(result.isSuccess).toBeTruthy();
    });

    // Now attempt to create the 6th ring and check the result
    const lastResult = await ringsService.create(data[data.length - 1]);

    expect(lastResult.isSuccess).toBeFalsy();
    expect(lastResult.error).toBe("Os anões não podem ter mais de 5 aneis!")
  });

  it("should not create more than 7 rings for Humans", async () => {
    const data: CreateRingDTO[] = Array(8).fill(null).map((_, index) => ({
      nome: `Anel ${index}`,
      poder: `Poder ${index}`,
      portador: "Gandalf",
      forjadoPor: "Humanos",
      imagem: "",
    }))

    const results = await Promise.all(data.map((ring) => ringsService.create(ring)))

    // Ensure the first 7 creations are successful
    results.forEach(result => {
      expect(result.isSuccess).toBeTruthy();
    });

    // Now attempt to create the 8th ring and check the result
    const lastResult = await ringsService.create(data[data.length - 1]);

    expect(lastResult.isSuccess).toBeFalsy();
    expect(lastResult.error).toBe("Os humanos não podem ter mais de 7 aneis!")
  });

  it("should not create a ring if given 'nome' already exists", async () => {
    const data = {
      nome: "Narya, o anel do fogo",
      poder: "Seu portador ganha resistência ao fogo",
      portador: "Gandalf",
      forjadoPor: "Elfos",
      imagem: "",
    } as CreateRingDTO;

    const firstResult = await ringsService.create(data);
    const secondResult = await ringsService.create(data);

    expect(firstResult.isSuccess).toBeTruthy()
    expect(secondResult.isSuccess).toBeFalsy()
    expect(secondResult.error).toBe("O nome do anel [Narya, o anel do fogo] já existe!")
  });

  it("should not create a ring if given data is in invalid format", async () => {
    const data = {
      nome: "Narya, o anel do fogo",
      poder: "Seu portador ganha resistência ao fogo",
      portador: "Gandalf",
      forjadoPor: "Eelfos",
      imagem: "",
    };

    // @ts-ignore
    const result = await ringsService.create(data);

    expect(result.isFailure).toBeTruthy();
    expect(result.error).toBe("ErroValorInvalido: o valor forjadoPor não pode ser do tipo [Eelfos]!");
  });
});
