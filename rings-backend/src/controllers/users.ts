import { Router } from 'express';

import { createAdmin } from '@useCases/users/createAdmin';

export const usersRouter = Router();

usersRouter.post('/users', createAdmin);
