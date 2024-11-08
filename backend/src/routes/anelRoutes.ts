import express from 'express';
const anelController = require('../controllers/anelController');

const router = express.Router();

router.post('/criar', anelController.createAnel);
router.get('/listar', anelController.listarAneis);
router.put('/atualizar/:id', anelController.updateAnel);
router.delete('/deletar/:id', anelController.deleteAnel);
router.get('/details/:id', anelController.getAnelById);

module.exports = router;
