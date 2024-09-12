import { DataSource } from 'typeorm';

const dbClient = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'rings_of_power',
  synchronize: true,
  logging: false,
  entities: [],
  migrations: [],
  subscribers: [],
});

export const startDbClient = async () => {
  try {
    await dbClient.initialize();
    console.log('DB iniciou com sucesso');
  } catch (err) {
    console.error('Erro na inicialização da DB', err);
  }
};

export default dbClient;
