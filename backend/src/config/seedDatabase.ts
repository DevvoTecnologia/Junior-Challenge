import { Owner } from '../models/Owner';
import { Ring } from '../models/Ring';
import dbClient from './database';

export async function seedDatabase() {
  const ownerRepository = dbClient.getRepository(Owner);
  const ringRepository = dbClient.getRepository(Ring);

  const gandalf = ownerRepository.create({ name: 'Gandalf' });
  const sauron = ownerRepository.create({ name: 'Sauron' });

  await ownerRepository.save([gandalf, sauron]);

  const rings = [
    ringRepository.create({
      name: 'Narya, o anel do fogo',
      power: 'Seu portador ganha resistência ao fogo',
      forgedBy: 'Elfos',
      image: 'https://i0.wp.com/www.valinor.com.br/wp-content/uploads/2010/05/narya1.jpg',
      currentOwner: gandalf,
    }),
    ringRepository.create({
      name: 'The One Ring',
      power: 'Domínio sobre todos os outros anéis',
      forgedBy: 'Sauron',
      image: 'https://upload.wikimedia.org/wikipedia/commons/d/d4/One_Ring_Blender_Render.png',
      currentOwner: sauron,
    }),
  ];

  await ringRepository.save(rings);

  console.log('Dados de seed inseridos com sucesso');
}
