import { Router } from 'express';
import { CreateRingController } from './controllers/ring/create-ring-controller';
import { ListRingController } from './controllers/ring/list-ring-controller';
import { UpdateRingController } from './controllers/ring/update-ring-controller';
import { RemoveRingController } from './controllers/ring/remove-ring-controller';

export const router = Router();

router.get('/rings', new ListRingController().handle);
router.post('/rings', new CreateRingController().handle);
router.put('/rings/:id', new UpdateRingController().handle);
router.delete('/rings/:id', new RemoveRingController().handle);
