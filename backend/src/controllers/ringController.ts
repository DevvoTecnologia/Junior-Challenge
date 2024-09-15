import { Request, Response } from 'express';
import AppDataSource from '../../db/data-source';
import { Ring } from '../models/Ring';
import { createRing } from '../services/ringService';

export const createRingController = async (req: Request, res: Response) => {
  try {
    const newRing = await createRing(req.body);
    res.status(201).json(newRing);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};

export const getAllRingsController = async (req: Request, res: Response) => {
  try {
    const ringRepository = AppDataSource.getRepository(Ring);
    const rings = await ringRepository.find();
    res.json(rings);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const updateRingController = async (req: Request, res: Response) => {
  try {
    const ringRepository = AppDataSource.getRepository(Ring);
    const id = parseInt(req.params.id, 10);
    const ring = await ringRepository.findOneBy({ id });
    if (!ring) {
      return res.status(404).json({ message: 'Ring not found' });
    }
    ringRepository.merge(ring, req.body);
    const result = await ringRepository.save(ring);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const deleteRingController = async (req: Request, res: Response) => {
  try {
    const ringRepository = AppDataSource.getRepository(Ring);
    const id = parseInt(req.params.id, 10);
    const result = await ringRepository.delete(id);
    if (result.affected === 0) {
      return res.status(404).json({ message: 'Ring not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};