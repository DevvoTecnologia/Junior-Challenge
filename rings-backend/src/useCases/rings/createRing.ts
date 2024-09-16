import { Bearer } from '@models/bearer';
import { Ring } from '@models/ring';
import { Request, Response } from 'express';
import { RingType } from 'types';

export const createRing = async (req: Request, res: Response) => {
  try {
    const { nome, poder, portador, forjadoPor, tipo } = req.body;
    const imagem = req.file?.filename;

    console.log({ nome, poder, portador, forjadoPor, imagem, tipo });

    if (!nome || !poder || !portador || !forjadoPor || !imagem || !tipo) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (!Object.values(RingType).includes(tipo as RingType)) {
      return res.status(400).json({ error: `Invalid ring type: ${tipo}` });
    }

    const existingBearer = await Bearer.findById(portador);
    if (!existingBearer) {
      return res.status(404).json({ error: 'Portador not found' });
    }

    const ring = await Ring.create({
      nome,
      poder,
      portador,
      forjadoPor,
      imagem,
      tipo,
    });

    existingBearer.aneis.push(ring._id);
    await existingBearer.save();

    return res.status(201).json({
      message: 'Ring successfully created',
      data: ring,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Internal server error' });
  }
};
