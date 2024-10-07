import { Router } from 'express';
import { RingController } from '../controllers/RingController';

const router = Router();
const ringController = new RingController();

router.post('/rings/create', ringController.create);
router.get('/rings', ringController.getAll);
router.put('/rings/update/:id', ringController.update);
router.delete('/rings/:id', ringController.delete);

export default router;