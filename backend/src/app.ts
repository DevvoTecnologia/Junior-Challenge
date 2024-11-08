import express from 'express';

const connectDB = require('./config/database');
const anelRoutes = require('./routes/anelRoutes');
const portadorRoutes = require('./routes/portadorRoutes');
const etniaRoutes = require('./routes/etniaRoutes');
const seedEtnias = require('./seeds/seedEtnias');
const seedPortadores = require('./seeds/seedPortador');
const cors = require('cors');

const app = express();

connectDB();

seedEtnias();
seedPortadores();

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
  }),
);

app.use(express.json());
app.use('/anel', anelRoutes);
app.use('/portador', portadorRoutes);
app.use('/etnia', etniaRoutes);

module.exports = app;
