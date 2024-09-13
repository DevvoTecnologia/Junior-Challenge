import { NextResponse } from 'next/server';
import AppDataSource from '../../../ormconfig'; // Adjust the path as needed
import { Ring } from '../../models/ring'; // Adjust the path as needed

// Function to GET all rings
export async function GET() {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    const ringRepository = AppDataSource.getRepository(Ring);
    const rings = ringRepository.find();

    return NextResponse.json({ status: 200, data: rings });
  } catch (error) {
    console.error('Error fetching rings:', error);
    return NextResponse.json({ status: 500, Error: 'Internal Server Error' });
  }
}

// Function to POST a new ring
export async function POST(request: Request) {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    const { ringName, power, holder, madeBy, imageUrl } = await request.json();

    // Verify if all necessary data is present
    if (!ringName || !power || !holder || !madeBy || !imageUrl) {
      return NextResponse.json({ status: 400, msg: 'Bad Request: Missing required fields' });
    }

    const ringRepository = AppDataSource.getRepository(Ring);

    const newRing = new Ring();
    newRing.ringName = ringName;
    newRing.power = power;
    newRing.holder = holder;
    newRing.madeBy = madeBy;
    newRing.imageUrl = imageUrl;

    await ringRepository.save(newRing);

    return NextResponse.json({ status: 201, msg: 'Ring created successfully', data: newRing });
  } catch (error) {
    console.error('Error creating ring:', error);
    return NextResponse.json({ status: 500, msg: 'Internal Server Error' });
  }
}
