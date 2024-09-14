import { Router } from 'express';
import { RingController } from '../controllers/RingController';

const ringRoutes = Router();
const ringController = new RingController();

ringRoutes.post('/anel', (req, res) => ringController.createRing(req, res));
ringRoutes.get('/anel', (req, res) => ringController.getAllRings(req, res));
ringRoutes.get('/anel/:id', (req, res) => ringController.getRingById(req, res));
ringRoutes.put('/anel/:id', (req, res) => ringController.updateRing(req, res)); 
ringRoutes.delete('/anel/:id', (req, res) => ringController.deleteRing(req, res)); 

export default ringRoutes;
