import { describe, expect, it } from "vitest";
import { IRing, Ring } from "./Rings";

describe("Rings", () => {
  it("should create a ring given valid data", () => {
    const data = {
      nome: "Narya, o anel do fogo",
      poder: "Seu portador ganha resistência ao fogo",
      portador: "Gandalf",
      forjadoPor: "Elfos",
      imagem: "",
    } as IRing;

    const result = Ring.create(data);
    const ring = result.getValue();

    expect(ring).toHaveProperty("id");
    expect(ring).toHaveProperty("nome", "Narya, o anel do fogo");
    expect(ring).toHaveProperty("poder", "Seu portador ganha resistência ao fogo");
    expect(ring).toHaveProperty("portador", "Gandalf");
    expect(ring).toHaveProperty("forjadoPor", "Elfos");
    expect(ring).toHaveProperty("imagem", "");
  });

  it("should not create a ring given invalid 'forjadoPor' value", () => {
    const data = {
      nome: "Narya, o anel do fogo",
      poder: "Seu portador ganha resistência ao fogo",
      portador: "Gandalf",
      forjadoPor: "Eelfos",
      imagem: "",
    };

    // @ts-ignore
    const result = Ring.create(data);

    expect(result.error).toStrictEqual(
      "ErroValorInvalido: o valor forjadoPor não pode ser do tipo [Eelfos]!",
    );
  });
});
