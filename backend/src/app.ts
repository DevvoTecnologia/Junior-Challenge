import cors from 'cors';
import express from 'express';
import { RingController } from './controllers/RingController';
import { checkJSONReq } from './middleware/checkJSONReq';
import { errorHandler } from './middleware/errorHandler';
import ringsRouter from './routes/rings';
import { OwnerService } from './services/OwnerService';
import { RingService } from './services/RingService';

const app = express();

app.use(cors());
app.use(express.json());

app.use(checkJSONReq);

const ownerService = new OwnerService();
const ringService = new RingService(ownerService);
const ringController = new RingController(ringService);

app.use('/rings', ringsRouter(ringController));

app.use(errorHandler);

export default app;
