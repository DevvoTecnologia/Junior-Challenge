import { Router } from 'express';

import { createBearer } from '@useCases/bearers/createBearer';

import { listBearers } from '@useCases/bearers/listBearers';

import { authAdmin } from '@middlewares/autheticationMiddleware';

export const bearersRouter = Router();

bearersRouter.get('/bearers', authAdmin, listBearers);

bearersRouter.post('/bearers', authAdmin, createBearer);
