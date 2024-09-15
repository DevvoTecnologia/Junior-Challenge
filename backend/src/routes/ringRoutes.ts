// src/routes/ringRoutes.ts
import { Router } from 'express';
import { RingDAO } from '../dao/ringDAO';
import { RingCreateSchema, RingUpdateSchema } from '../schemas/ringSchemas';
import AppDataSource from '../../db/data-source';

const router = Router();
const ringDAO = new RingDAO(AppDataSource);

router.post('/rings', async (req, res) => {
  try {
    const parsedBody = RingCreateSchema.parse(req.body);
    const ring = await ringDAO.create(parsedBody);
    res.status(201).json(ring);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'An unexpected error occurred' });
    }
  }
});

router.get('/rings', async (req, res) => {
  try {
    const rings = await ringDAO.findAll();
    res.status(200).json(rings);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }
});

router.get('/rings/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const ring = await ringDAO.findById(id);
    if (ring) {
      res.status(200).json(ring);
    } else {
      res.status(404).json({ error: 'Ring not found' });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }
});

router.put('/rings/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const parsedBody = RingUpdateSchema.parse(req.body);
    const ring = await ringDAO.update(id, parsedBody);
    if (ring) {
      res.status(200).json(ring);
    } else {
      res.status(404).json({ error: 'Ring not found' });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'An unexpected error occurred' });
    }
  }
});

router.delete('/rings/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    await ringDAO.delete(id);
    res.status(204).send();
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }
});

export default router;
