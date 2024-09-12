import { Router } from 'express';
import { CreateRingController } from './controllers/ring/create-ring-controller';

export const router = Router();

router.post('/rings', new CreateRingController().handle);
