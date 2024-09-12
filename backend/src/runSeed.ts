import 'reflect-metadata';
import dbClient, { startDbClient } from './config/database';
import { seedDatabase } from './config/seedDatabase';

async function runSeed() {
  try {
    await startDbClient();
    await seedDatabase();
    console.log('Iniciando seed');
  } catch (error) {
    console.error('Erro ao fazer o seed da DB:', error);
  } finally {
    await dbClient.destroy();
  }
}

runSeed();
