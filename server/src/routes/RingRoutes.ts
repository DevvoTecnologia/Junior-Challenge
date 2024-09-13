import { Router } from 'express';
import { RingController } from '../controllers/RingController';
import { RingRepository } from '../repositories/RingRepository';

export const ringRouter = Router();
const ringRepository = new RingRepository(); // Injetando a implementação
const ringController = new RingController(ringRepository);

ringRouter.options(
  '/forged-by',
  ringController.getForgedByOptions.bind(ringController),
);

ringRouter.post('/', ringController.create.bind(ringController));
ringRouter.get('/', ringController.list.bind(ringController));
ringRouter.get('/:id', ringController.get.bind(ringController));
ringRouter.put('/:id', ringController.update.bind(ringController));
ringRouter.delete('/:id', ringController.delete.bind(ringController));
