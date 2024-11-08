import express from 'express';

const etniaController = require('../controllers/etniaController');

const router = express.Router();

router.get('/listar', etniaController.listarEtnias);

module.exports = router;
