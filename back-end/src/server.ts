import express from 'express';
import AppDataSource from './database/index'; // Ajuste o caminho conforme necessário
import userRoutes from './routes/userRoutes';

const app = express();

app.use(express.json());
app.use('/api', userRoutes);

AppDataSource.initialize()
    .then(() => {
        console.log('Database connected');
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    })
    .catch(error => console.log('Database connection error:', error));
