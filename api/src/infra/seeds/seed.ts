import { seedCharacters } from './seed-characters'
import { seedSmiths } from './seed-smiths'

async function runSeeds() {
  try {
    await seedSmiths()
    await seedCharacters()
  } catch (error) {
    console.error('Erro ao executar a inserção dos dados:', error)
    process.exit(1)
  }
}

runSeeds()
