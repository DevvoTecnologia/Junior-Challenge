import express from 'express';
import cors from 'cors'
import { config } from 'dotenv';
import { connectToDatabase } from './database/mongo'; 
import { RingService } from './services/ring-service';
import { MongoCreateRingRepository } from './repositories/create-ring/mongo-create-ring';
import { MongoUpdateRingRepository } from './repositories/update-ring/mongo-update-ring';
import { MongoDeleteRingRepository } from './repositories/delete-ring/mongo-delete-ring';
import { MongoGetRingsRepository } from './repositories/get-rings/mongo-get-rings';

config();

const app = express();

app.use(cors());
app.use(express.json());

connectToDatabase().catch(err => {
  console.error("Failed to connect to MongoDB", err);
  process.exit(1);
});

const createRingRepo = new MongoCreateRingRepository();
const updateRingRepo = new MongoUpdateRingRepository();
const deleteRingRepo = new MongoDeleteRingRepository();
const getRingsRepo = new MongoGetRingsRepository();

const ringService = new RingService(createRingRepo, updateRingRepo, deleteRingRepo, getRingsRepo);

app.get('/rings', async (req, res) => {
  try {
    const rings = await ringService.getRings();
    res.status(200).send(rings);
  } catch (error) {
    console.error("Error in GET /rings:", error);
    res.status(500).send({ error });
  }
});

app.post('/rings', async (req, res) => {
  try {
    const ring = await ringService.createRing(req.body);
    res.status(201).send(ring);
  } catch (error) {
    res.status(400).send({ error});
  }
});

app.get('/rings/:id', async (req, res) => {
  try {
    const ring = await ringService.getRingById(req.params.id);
    if (ring) {
      res.status(200).send(ring);
    } else {
      res.status(404).send({ error: 'Ring not found' });
    }
  } catch (error) {
    res.status(500).send({ error});
  }
});

app.put('/rings/:id', async (req, res) => {
  try {
    const ring = await ringService.updateRing(req.params.id, req.body);
    if (ring) {
      res.status(200).send(ring);
    } else {
      res.status(404).send({ error: 'Ring not found' });
    }
  } catch (error) {
    res.status(400).send({ error});
  }
});

app.delete('/rings/:id', async (req, res) => {
  try {
    const ring = await ringService.deleteRing(req.params.id);
    if (ring) {
      res.status(200).send({ message: 'Ring deleted successfully' });
    } else {
      res.status(404).send({ error: 'Ring not found' });
    }
  } catch (error) {
    res.status(500).send({ error});
  }
});


const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on port ${port}!`));


