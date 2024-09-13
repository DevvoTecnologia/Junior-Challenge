import { NextRequest, NextResponse } from "next/server";
import AppDataSource from "../../../../ormconfig"; // Adjust the path as necessary
import { Anel } from '../../../models/ring'; // Adjust the path as necessary

// Handle PUT (Update a ring)
export async function PUT(request: NextRequest, { params }: { params: { ring_id: string } }) {
  const ringId = parseInt(params.ring_id, 10); // Convert string to number

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

    return NextResponse.json({ status: 200, msg: 'Ring updated successfully', data: ring });
  } catch (error) {
    console.error('Error updating ring:', error);
    return NextResponse.json({ status: 500, msg: 'Internal Server Error' });
  }
}

// Handle DELETE (Delete a ring)
export async function DELETE(request: NextRequest, { params }: { params: { ring_id: string } }) {
  const ringId = parseInt(params.ring_id, 10); // Convert string to number

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

    return NextResponse.json({ status: 200, msg: 'Ring deleted successfully' });
  } catch (error) {
    console.error('Error deleting ring:', error);
    return NextResponse.json({ status: 500, msg: 'Internal Server Error' });
  }
}
