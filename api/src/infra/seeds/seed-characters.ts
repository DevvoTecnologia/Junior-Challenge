import { AppDataSource } from '../data-source'
import { nanoid } from 'nanoid'

export async function seedCharacters() {
  const dataSource = AppDataSource
  await dataSource.initialize()

  const queryRunner = dataSource.createQueryRunner()
  await queryRunner.connect()
  await queryRunner.startTransaction()

  try {
    const characters = [
      {
        name: 'Aragorn',
        description: 'O Rei dos Homens, conhecido por sua coragem e liderança.',
        imageUrl: 'https://example.com/image1.jpg',
      },
      {
        name: 'Legolas',
        description:
          'Elfo ágil e mestre arqueiro, conhecido por sua habilidade com o arco.',
        imageUrl: 'https://example.com/image2.jpg',
      },
      {
        name: 'Gimli',
        description:
          'Anão destemido e guerreiro, com uma habilidade impressionante em combate.',
        imageUrl: 'https://example.com/image3.jpg',
      },
      {
        name: 'Gandalf',
        description:
          'O Mago Cinzento, conhecido por sua sabedoria e poder mágico.',
        imageUrl: 'https://example.com/image4.jpg',
      },
      {
        name: 'Frodo',
        description:
          'O portador do Um Anel, conhecido por sua determinação e coragem.',
        imageUrl: 'https://example.com/image5.jpg',
      },
      {
        name: 'Samwise',
        description:
          'Leal amigo e companheiro de Frodo, conhecido por sua bravura e lealdade.',
        imageUrl: 'https://example.com/image6.jpg',
      },
      {
        name: 'Arwen',
        description:
          'A elfa de beleza encantadora, conhecida por seu amor e coragem.',
        imageUrl: 'https://example.com/image7.jpg',
      },
      {
        name: 'Boromir',
        description:
          'O Guerreiro de Gondor, conhecido por sua bravura e ambição.',
        imageUrl: 'https://example.com/image8.jpg',
      },
      {
        name: 'Éowyn',
        description:
          'A Senhora de Rohan, conhecida por sua coragem e habilidades de combate.',
        imageUrl: 'https://example.com/image9.jpg',
      },
      {
        name: 'Faramir',
        description:
          'O Capitão de Gondor, conhecido por sua sabedoria e habilidades estratégicas.',
        imageUrl: 'https://example.com/image10.jpg',
      },
    ]

    for (const character of characters) {
      await queryRunner.query(
        `INSERT INTO "characters" (id, name, description, "imageUrl") VALUES ($1, $2, $3, $4)`,
        [nanoid(), character.name, character.description, character.imageUrl],
      )
    }

    await queryRunner.commitTransaction()
    console.log('Dados dos personagens inseridos com sucesso!')
  } catch {
    await queryRunner.rollbackTransaction()
    console.error('Erro ao inserir dados:')
  } finally {
    await queryRunner.release()
  }

  await dataSource.destroy()
}
