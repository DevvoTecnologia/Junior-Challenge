import { NextResponse } from 'next/server';
import AppDataSource from '../../../ormconfig'; // Adjust the path as needed
import { Anel } from '../../models/ring'; // Adjust the path as needed

// Function to GET all rings
export async function GET() {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    const ringRepository = AppDataSource.getRepository(Anel);

    // Await the result of find()
    const rings = await ringRepository.find();

    // Return the response with status and data
    return NextResponse.json({ status: 200, data: rings });
  } catch (error) {
    console.error('Error fetching rings:', error);

    // Handle error
    return NextResponse.json({ status: 500, Error: 'Internal Server Error' });
  }
}

// Function to POST a new ring
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

    return NextResponse.json({ status: 201, msg: 'Ring created successfully', data: novoAnel });
  } catch (error) {
    console.error('Error creating ring:', error);
    return NextResponse.json({ status: 500, msg: 'Internal Server Error' });
  }
}
