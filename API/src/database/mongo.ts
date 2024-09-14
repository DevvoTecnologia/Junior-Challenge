import { MongoClient as MongoDBClient } from 'mongodb';

// URL de conexão com o MongoDB
const uri = "mongodb+srv://root:123@cluster0.gzdru.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Crie uma instância do cliente mongo
const client = new MongoDBClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// conecta o banco de dados
export const connectToDatabase = async () => {
  try {
    await client.connect();
    console.log("Successfully connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    throw error;
  }
};

// Exporta o cliente de banco de dados
export const MongoClient = {
  db: client.db('rings-db') 
};
