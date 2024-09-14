// src/routes/ringRoutes.ts

import { Router } from 'express';
import RingController from '../controllers/RingController';

const router = Router();

router.post('/', RingController.create);
router.get('/', RingController.getAll);
router.put('/:id', RingController.update);
router.delete('/:id', RingController.delete);

export default router;
