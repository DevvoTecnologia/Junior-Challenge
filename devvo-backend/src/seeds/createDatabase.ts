import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

const createDatabaseDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: "postgres",  
});

const createDatabase = async () => {
  try {
    await createDatabaseDataSource.initialize();


    await createDatabaseDataSource.query(`CREATE DATABASE ${process.env.DB_NAME}`);

    console.log(`Banco de dados '${process.env.DB_NAME}' criado com sucesso!`);
  } catch (error: unknown) {

    if (error instanceof Error) {
      if (error.message.includes('42P04')) {
        console.log(`Banco de dados '${process.env.DB_NAME}' já existe.`);
      } else {
        console.error("Erro ao criar o banco de dados:", error.message);
      }
    } else {
      console.error("Erro desconhecido:", error);
    }
  } finally {
    await createDatabaseDataSource.destroy(); 
  }
};

createDatabase();
