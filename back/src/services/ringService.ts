import Ring from '../models/ring';

export const createRingService = async (newRing: {
  name: string;
  power: string;
  bearer: string;
  forgedBy: string;
  image?: string;
}) => {
  try {
    const createdRing = await Ring.create(newRing, { returning: true });
    return createdRing;
  } catch (error) {
    throw new Error('Error creating ring in the database: ' + error);
  }
};

export const updateRingService = async (updatedRing: {
  id: number;
  name: string;
  power: string;
  bearer: string;
  image?: string;
}) => {
  const ring = await getRingService(updatedRing.id);

  if (ring.bearer !== updatedRing.bearer) {
    throw new Error('Not authorized');
  }

  await Ring.update(
    {
      name: updatedRing.name,
      power: updatedRing.power,
      bearer: updatedRing.bearer,
      image: updatedRing.image,
    },
    { where: { id: updatedRing.id } }
  );

  return await getRingService(updatedRing.id);
};

export const deleteRingService = async (id: number, bearerId: string) => {
  const ring = await Ring.findOne({ where: { id } });

  if (!ring) {
    throw new Error('Ring not found');
  }

  if (ring.bearer !== bearerId) {
    throw new Error('Not authorized');
  }

  await Ring.destroy({ where: { id } });
};

export const getRingService = async (id: number) => {
  try {
    const ring = await Ring.findOne({ where: { id } });
    if (!ring) {
      throw new Error('Ring not found');
    }
    return ring;
  } catch (error) {
    throw new Error('Database error occurred');
  }
};

export const getAllRingsService = async () => {
  return await Ring.findAll();
};
