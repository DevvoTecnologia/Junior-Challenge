import express from 'express';

const portadorController = require('../controllers/portadorController');

const router = express.Router();

router.get('/listar', portadorController.listarPortadores);

module.exports = router;
