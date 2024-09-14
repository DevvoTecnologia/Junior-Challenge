import { NextResponse } from "next/server";
import AppDataSource from "../../../ormconfig";
import { Anel } from "../../models/ring";

export async function GET() {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    const ringRepository = AppDataSource.getRepository(Anel);
    const rings = await ringRepository.find();

    return NextResponse.json({
      status: 200,
      data: rings
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      msg: "Erro: não foi retornar os anéis criados",
      erro: error
    });
  }
}
export async function POST(request: Request) {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    const { nome, poder, portador, forjadoPor, imagem } = await request.json();

    // Validation checks
    if (!nome) {
      return NextResponse.json({
        status: 400,
        msg: "Bad Request: o campo nome não pode ser nulo ou indefinido"
      });
    }
    if (!poder) {
      return NextResponse.json({
        status: 400,
        msg: "Bad Request: o campo poder não pode ser nulo ou indefinido"
      });
    }
    if (!portador) {
      return NextResponse.json({
        status: 400,
        msg: "Bad Request: o campo portador não pode ser nulo ou indefinido"
      });
    }
    if (!forjadoPor) {
      return NextResponse.json({
        status: 400,
        msg: "Bad Request: o campo forjadoPor não pode ser nulo ou indefinido"
      });
    }
    if (!imagem) {
      return NextResponse.json({
        status: 400,
        msg: "Bad Request: o campo imagem não pode ser nulo ou indefinido"
      });
    }

    const ringRepository = AppDataSource.getRepository(Anel);

    const existingRings = await ringRepository.find({
      where: { forjadoPor: forjadoPor }
    });

    type Forjadores = "Sauron" | "Elfos" | "Anões" | "Humanos";

    const ringLimits: Record<Forjadores, number> = {
      Sauron: 1,
      Elfos: 3,
      Anões: 7,
      Humanos: 9,
    };

    if (forjadoPor in ringLimits) {
      if (existingRings.length >= ringLimits[forjadoPor as Forjadores]) {
        return NextResponse.json(
          {
            msg: `Erro: Apenas ${ringLimits[forjadoPor as Forjadores]} anel(éis) pode(m) ser forjado(s) por ${forjadoPor}.`,
          },
          { status: 400 }
        );
      }
    }

    const novoAnel = new Anel();
    novoAnel.nome = nome;
    novoAnel.poder = poder;
    novoAnel.portador = portador;
    novoAnel.forjadoPor = forjadoPor;
    novoAnel.imagem = imagem;

    await ringRepository.save(novoAnel);

    return NextResponse.json({
      status: 201,
      msg: "Anel criado com sucesso!",
      data: novoAnel
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      msg: "Erro: não foi possível criar um novo anel",
      erro: error
    });
  }
}
