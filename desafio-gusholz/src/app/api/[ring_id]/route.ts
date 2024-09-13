import { NextRequest, NextResponse } from "next/server";
import AppDataSource from "../../../../ormconfig";
import { Anel } from '../../../models/ring';

export async function PUT(request: NextRequest, { params }: { params: { ring_id: string } }) {
  const ringId = parseInt(params.ring_id, 10);

  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    const ringRepository = AppDataSource.getRepository(Anel);
    const ring = await ringRepository.findOne({ where: { id: ringId } });

    if (!ring) {
      return NextResponse.json({ status: 404, msg: 'Ring not found' });
    }

    const body = await request.json();
    const { nome, poder, portador, feitoPor, imagem } = await request.json();

    // newRing.nome = nome;
    // newRing.poder = poder;
    // newRing.portador = portador;
    // newRing.feitoPor = feitoPor;
    // newRing.imagem = imagem;

    await ringRepository.save(ring);

    return NextResponse.json({
      status: 200,
      msg: "Anel atualizado com sucesso:",
      data: ring
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      msg: "Erro: não foi possível atualizar o anel selecionado",
      erro: error
    });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { ring_id: string } }) {
  const ringId = parseInt(params.ring_id, 10);

  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    const ringRepository = AppDataSource.getRepository(Anel);
    const ring = await ringRepository.findOne({ where: { id: ringId } });

    if (!ring) {
      return NextResponse.json({ status: 404, msg: 'Ring not found' });
    }

    await ringRepository.remove(ring);

    return NextResponse.json({
      status: 200,
      msg: "Anel deletado com sucesso!"
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      msg: "Erro: não foi possível deletar novo anel",
      erro: error
    });
  }
}
