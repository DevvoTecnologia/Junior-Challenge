export const createRingService = async (
  title: string,
  content: string,
  authorId: string
) => {
  try {
    return await Ring.create({
      data: {
        title,
        content,
        authorId,
      },
    });
  } catch {
    throw new Error('Error on create ring on database');
  }
};

export const updateRingService = async (
  id: number,
  title: string,
  content: string,
  authorId: string
) => {
  const ring = await getRingService(id);

  if (ring?.authorId !== authorId) {
    throw new Error('Not authorized');
  }

  return await Ring.update({
    where: { id },
    data: { title, content },
  });
};

export const deleteRingService = async (id: string, bearerId: string) => {
  const ring = await Ring.findUnique({ where: { id } });

  if (!ring) {
    throw new Error('Ring not found');
  }

  if (ring.bearerId !== bearerId) {
    throw new Error('Not authorized');
  }

  return await Ring.delete({ where: { id } });
};

export const getRingService = async (id: string) => {
  try {
    const ring = await Ring.findUnique({ where: { id } });
    if (!ring) {
      throw new Error('Ring not found');
    }
    return ring;
  } catch (error) {
    console.error('Error fetching ring:', error);
    throw new Error('Database error occurred');
  }
};

export const getAllRingsService = async () => {
  return await Ring.findMany({});
};
