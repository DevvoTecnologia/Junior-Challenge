import { Ring } from '@models/ring';
import { Request, Response } from 'express';
import { RingType } from 'types';

export const updateRing = async (req: Request, res: Response) => {
  const { ringId } = req.params;
  try {
    const { nome, poder, portador, forjadoPor, tipo } = req.body;
    const imagem = req.file?.filename;
    console.log({ ringId, nome, poder, portador, forjadoPor, imagem, tipo });

    if (!nome || !poder || !portador || !forjadoPor || !imagem || !tipo) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (tipo && !Object.values(RingType).includes(tipo as RingType)) {
      return res.status(400).json({ error: `Invalid ring type: ${tipo}` });
    }

    const updatedRing = await Ring.findByIdAndUpdate(
      ringId,
      { nome, poder, portador, forjadoPor, imagem, tipo },
      { new: true, runValidators: true },
    );

    if (!updatedRing) {
      return res.status(404).json({ error: 'Ring not found' });
    }

    return res.status(200).json(updatedRing);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Internal server error' });
  }
};
