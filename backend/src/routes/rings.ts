import { Router } from 'express';
import { RingController } from '../controllers/RingController';
import { validateOwner } from '../middleware/validationOwner';
import { validateRing } from '../middleware/validationRing';

export default function (ringController: RingController) {
  const router = Router();

  router.get('/', ringController.getAllRings);
  router.post('/', validateRing, validateOwner, ringController.createRing);
  router.put('/:id', validateRing, validateOwner, ringController.updateRing);
  router.delete('/:id', ringController.deleteRing);

  return router;
}
