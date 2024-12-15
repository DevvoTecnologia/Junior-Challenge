import { Router } from 'express';
import { RingController } from '../controllers/ringController';

const router = Router();

router.post('/rings', RingController.create);
router.get('/rings', RingController.list);
router.put('/rings/:id', RingController.update);
router.delete('/rings/:id', RingController.delete);
router.get('/rings/:id', RingController.getById);

export default router;
