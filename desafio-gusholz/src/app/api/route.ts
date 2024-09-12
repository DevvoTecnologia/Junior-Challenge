import { NextResponse } from 'next/server';
import AppDataSource from '../../../ormconfig'; // Ajuste o caminho conforme sua estrutura
import { Ring } from '../../models/ring'; // Ajuste o caminho conforme sua estrutura
import { NextApiRequest, NextApiResponse } from 'next';

// Função GET para buscar todos os anéis
export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {

    const ringRepository = AppDataSource.getRepository(Ring);
    const rings = await ringRepository.find();

    res.status(200).json({ "deu bom!": "sim" });
  } catch (error) {
    console.error('Error fetching rings:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Função POST para criar um novo anel
export async function POST(request: Request) {
  try {
    const { ringName, power, holder, madeBy, imageUrl } = await request.json();

    // Verifique se todos os dados necessários estão presentes
    if (!ringName || !power || !holder || !madeBy || !imageUrl) {
      return NextResponse.json({ status: 400, msg: 'Bad Request: Missing required fields' });
    }

    const ringsRepository = AppDataSource.getRepository(Ring);

    const newRing = new Ring();
    newRing.ringName = ringName;
    newRing.power = power;
    newRing.holder = holder;
    newRing.madeBy = madeBy;
    newRing.imageUrl = imageUrl;

    await ringsRepository.save(newRing);

    return NextResponse.json({ status: 201, msg: 'Ring created successfully', data: newRing });
  } catch (error) {
    console.error('Error creating ring:', error);
    return NextResponse.json({ status: 500, msg: 'Internal Server Error' });
  }
}
