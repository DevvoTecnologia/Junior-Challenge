import { execSync } from 'child_process'
import path from 'path'

const migrationName = process.argv[2]
if (!migrationName) {
  console.error('Por favor, forneça o nome da migração.')
  process.exit(1)
}

const __dirname = path.resolve()

const migrationsDir = path.join(__dirname, 'src', 'infra', 'migrations')

const command = `tsx ./node_modules/typeorm/cli -d ./src/infra/data-source.ts migration:generate ${path.join(migrationsDir, migrationName)}`

console.log(`Executando: ${command}`)
execSync(command, { stdio: 'inherit' })
