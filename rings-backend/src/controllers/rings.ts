import { Router } from 'express';

import { createRing } from '@useCases/rings/createRing';
import { getRingById } from '@useCases/rings/getRingById';
import { listRings } from '@useCases/rings/listRings';
import { removeRing } from '@useCases/rings/removeRing';
import { updateRing } from '@useCases/rings/updateRing';

import { uploadPhoto } from '@lib/uploadPhoto';
import { authAdmin } from '@middlewares/autheticationMiddleware';

export const ringsRouter = Router();

ringsRouter.get('/rings', authAdmin, listRings);

ringsRouter.post('/rings', authAdmin, uploadPhoto.single('imagem'), createRing);

ringsRouter.get('/rings/:ringId', authAdmin, getRingById);

ringsRouter.put('/rings/:ringId', authAdmin, uploadPhoto.single('imagem'), updateRing);

ringsRouter.delete('/rings/:ringId', authAdmin, removeRing);
