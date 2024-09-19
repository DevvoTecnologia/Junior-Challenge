import { AppDataSource } from '../data-source'
import { nanoid } from 'nanoid'

export async function seedSmiths() {
  const dataSource = AppDataSource
  await dataSource.initialize()

  const queryRunner = dataSource.createQueryRunner()
  await queryRunner.connect()
  await queryRunner.startTransaction()

  try {
    const smiths = [
      {
        name: 'Elfos Arcanos',
        description:
          'Mestres da magia e da criação. Seus artefatos possuem propriedades encantadas e misteriosas. São conhecidos por criar apenas até 3 anéis, todos com um poder inigualável.',
        itemLimit: 3,
      },
      {
        name: 'Anões Forjadores',
        description:
          'Especialistas em forjar artefatos robustos e duráveis. Seu conhecimento sobre metais é lendário, permitindo a criação de até 7 anéis com habilidades surpreendentes.',
        itemLimit: 7,
      },
      {
        name: 'Homens Valorosos',
        description:
          'Artífices destemidos com habilidades em criação de artefatos que refletem sua coragem e astúcia. Podem criar até 9 anéis com uma ampla gama de poderes.',
        itemLimit: 9,
      },
      {
        name: 'Sauron',
        description:
          'O Senhor das Trevas, conhecido por seu poder absoluto. Possui a habilidade de criar apenas um anel, mas este é capaz de controlar e dominar outros artefatos com uma força aterrorizante.',
        itemLimit: 1,
      },
    ]

    for (const smith of smiths) {
      await queryRunner.query(
        `INSERT INTO "smiths" (id, name, description, "itemLimit") VALUES ($1, $2, $3, $4)`,
        [nanoid(), smith.name, smith.description, smith.itemLimit],
      )
    }

    await queryRunner.commitTransaction()
    console.log('Dados dos Smiths inseridos com sucesso!')
  } catch {
    await queryRunner.rollbackTransaction()
    console.error('Erro ao inserir dados dos Smiths')
  } finally {
    await queryRunner.release()
    await dataSource.destroy()
  }
}
