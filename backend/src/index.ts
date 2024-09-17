import express from "express"
import mongoose from 'mongoose';
import ringRouter from './routes/ring.routes';
import cors from 'cors'


const app = express();
const port = 3000;

app.use(express.json());
app.use(cors())
app.use(express.urlencoded({extended: false}));
app.use('/api/rings', ringRouter);

mongoose.connect('mongodb+srv://lucastxsan:23santos@lucas-cluster.goftc.mongodb.net/?retryWrites=true&w=majority&appName=lucas-cluster')
    .then(() => console.log('Connected to the database.'))
    .catch(() => console.log("Connection Failed!"));

app.listen(port, () => console.log(`Server running on port ${port}`));