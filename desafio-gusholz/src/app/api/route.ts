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

    // // Verify if all necessary data is present
    // if (!ringName || !power || !holder || !madeBy || !imageUrl) {
    //   return NextResponse.json({ status: 400, msg: 'Bad Request: Missing required fields' });
    // }

    const ringRepository = AppDataSource.getRepository(Anel);

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
