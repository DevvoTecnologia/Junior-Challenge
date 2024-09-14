import AppDataSource from './database/index'; 
import app from './app';

AppDataSource.initialize()
    .then(() => {
        console.log('Database connected');
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    })
    .catch(error => console.log('Database connection error:', error));
