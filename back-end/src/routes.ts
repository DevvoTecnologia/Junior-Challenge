import { Router } from 'express';
import { CreateRingController } from './controllers/ring/create-ring-controller';
import { ListRingController } from './controllers/ring/list-ring-controller';

export const router = Router();

router.get('/rings', new ListRingController().handle);
router.post('/rings', new CreateRingController().handle);
