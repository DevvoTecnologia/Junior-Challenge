import { Router } from 'express';
import { CreateRingController } from './controllers/ring/create-ring-controller';
import { ListRingController } from './controllers/ring/list-ring-controller';
import { UpdateRingController } from './controllers/ring/update-ring-controller';
import { RemoveRingController } from './controllers/ring/remove-ring-controller';
import { CreateUserController } from './controllers/user/create-user-controller';
import { AuthUserController } from './controllers/user/auth-user-controller';

export const router = Router();

router.post('/auth', new AuthUserController().handle);
router.post('/users', new CreateUserController().handle);

router.get('/rings', new ListRingController().handle);
router.post('/rings', new CreateRingController().handle);
router.put('/rings/:id', new UpdateRingController().handle);
router.delete('/rings/:id', new RemoveRingController().handle);
