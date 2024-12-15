import { DataSource } from 'typeorm';

//Configuração do Postgres.
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',         
  port: 5432,               
  username: 'postgres',   
  password: '123',     
  database: 'desafio_aneis', 
  synchronize: true,         
  logging: false,
  entities: ['./src/entities/*.ts'], 
  migrations: [],
  subscribers: [],
});
