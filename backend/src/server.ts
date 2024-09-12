import 'reflect-metadata';
import app from './app';
import { startDbClient } from './config/database';

const port = process.env.PORT || 3000;

async function startServer() {
  await startDbClient();
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

startServer().catch((error) => console.error('Failed to start server:', error));
