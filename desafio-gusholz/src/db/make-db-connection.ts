import { initializeDatabase } from "../../ormconfig";

async function initialize() {
  await initializeDatabase();
}

initialize().catch(error => {
  console.error('Failed to initialize database:', error);
  process.exit(1); // Encerra o processo em caso de falha
});
