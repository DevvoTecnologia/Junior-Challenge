import { Result } from "../../../shared/Result";

export interface IRing {
  nome: string;
  poder: string;
  portador: string;
  forjadoPor: "Sauron" | "Elfos" | "Anões" | "Humanos";
  imagem: string;
}

export class Ring {
  id;
  nome;
  poder;
  portador;
  forjadoPor;
  imagem;

  constructor(ring: IRing) {
    this.id = crypto.randomUUID();
    this.nome = ring.nome;
    this.poder = ring.poder;
    this.portador = ring.portador;
    this.forjadoPor = ring.forjadoPor;
    this.imagem = ring.imagem;
  }

  public static create(ring: IRing) {
    const result = this.validateForjadoPor(ring.forjadoPor);

    if (result.isFailure) {
      return Result.fail<Ring>(result.error);
    }

    return Result.ok<Ring>(new Ring(ring));
  }

  private static validateForjadoPor(forjadoPor: string) {
    const options = ["Sauron", "Elfos", "Anões", "Humanos"]

    if (!options.includes(forjadoPor)) {
      return Result.fail<Ring>(`ErroValorInvalido: o valor forjadoPor não pode ser do tipo [${forjadoPor}]!`);
    }

    return Result.ok<Ring>()
  }
}
