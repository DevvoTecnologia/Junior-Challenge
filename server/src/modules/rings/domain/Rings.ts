import { Column, Entity, PrimaryColumn } from "typeorm"
import { Result } from "../../../shared/Result";

export interface IRing {
  id?: string
  nome: string;
  poder: string;
  portador: string;
  forjadoPor: "Sauron" | "Elfos" | "Anões" | "Humanos";
  imagem: string;
}

@Entity("rings")
export class Ring {
  @PrimaryColumn({ type: "varchar" })
  id: string;

  @Column({ type: "varchar" })
  nome: string;

  @Column({ type: "varchar" })
  poder: string;

  @Column({ type: "varchar" })
  portador: string;

  @Column({ type: "varchar" })
  forjadoPor: string;

  @Column({ type: "varchar" })
  imagem: string;

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
