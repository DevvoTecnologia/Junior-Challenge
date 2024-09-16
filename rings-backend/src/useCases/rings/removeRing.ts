import { removePhoto } from '@lib/removePhoto';
import { Bearer } from '@models/bearer';
import { Ring } from '@models/ring';
import { Request, Response } from 'express';

export const removeRing = async (req: Request, res: Response) => {
  try {
    const { ringId } = req.params;

    const ring = await Ring.findByIdAndDelete(ringId);

    if (!ring) {
      return res.status(404).json({ error: 'Ring not found' });
    }

    if (ring.imagem) {
      removePhoto(ring.imagem);
    }

    await Bearer.updateOne(
      { _id: ring.portador },
      { $pull: { aneis: ringId } }
    );

    return res.sendStatus(204);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Internal server error' });
  }
};
