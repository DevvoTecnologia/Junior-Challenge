import { AppDataSource } from './data-source'

const initializeDatabase = async () => {
  try {
    await AppDataSource.initialize()
    console.log('Database connection established')
  } catch (error) {
    console.error('Database connection failed', error)
    process.exit(1)
  }
}

export default initializeDatabase
