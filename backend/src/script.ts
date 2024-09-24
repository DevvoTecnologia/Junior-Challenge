import 'reflect-metadata'
import { typeOrm } from './infra/database/typeorm'
import { ForgersTypeOrmRepository } from './infra/database/typeorm/repositories'

async function main() {
  await typeOrm.initialize()

  const forgersRepository = new ForgersTypeOrmRepository()

  await forgersRepository.create({
    name: 'Elfos',
    maxRings: 3
  })
  await forgersRepository.create({
    name: 'Anões',
    maxRings: 7
  })
  await forgersRepository.create({
    name: 'Homens',
    maxRings: 9
  })
  await forgersRepository.create({
    name: 'Sauron',
    maxRings: 1
  })
}

main()
