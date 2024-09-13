import { Router } from 'express';
import { RingController } from '../controllers/RingController';

export default function (ringController: RingController) {
  const router = Router();

  router.get('/', ringController.getAllRings);
  router.post('/', ringController.createRing);
  router.put('/:id', ringController.updateRing);
  router.delete('/:id', ringController.deleteRing);

  return router;
}
