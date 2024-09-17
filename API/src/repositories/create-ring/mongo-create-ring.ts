import { ICreateRingRepository } from '../repositories';
import { Rings, RingModel } from '../../models/rings';
import { CreateRingParams } from '../../controllers/create-ring/protocols';

export class MongoCreateRingRepository implements ICreateRingRepository {

  private availableImages: string[] = [
    'https://i.pinimg.com/564x/b9/30/a7/b930a7871c6c38faef57aaa1a5ddf7b5.jpg',
    'https://i.pinimg.com/564x/89/1e/06/891e06479c027e3c35c465f1b1465f3f.jpg',
    'https://i.pinimg.com/564x/58/34/d0/5834d04f61892bf3237bc8e6e862b4a2.jpg',
    'https://i.pinimg.com/564x/f6/69/3f/f6693f4fddd4455931fdbfbd745be072.jpg',
    'https://i.pinimg.com/564x/43/7f/69/437f69d7353f0b4dae5fc5002367d0f1.jpg',
  ];

  private getRandomImageUrl(): string {
    const randomIndex = Math.floor(Math.random() * this.availableImages.length);
    return this.availableImages[randomIndex];
  }

  // função para contar quantos aneis já foram criados por determinado forjador
  private async countRingsByOwner(builtBy: string): Promise<number> {
    return RingModel.countDocuments({ builtBy }).exec();
  }

  // funcao principal para criar o anel com controle de limite e imagem
  async createRing(params: CreateRingParams): Promise<Rings> {
    const { ringName, powerName, ownerName, builtBy } = params;

    let limit: number;
    switch (builtBy.toLowerCase()) {
      case 'elfos':
        limit = 3;
        break;
      case 'anões':
        limit = 7;
        break;
      case 'homens':
        limit = 9;
        break;
      case 'sauron':
        limit = 1;
        break;
      default:
        throw new Error('O forjador fornecido é inválido.');
    }

    const count = await this.countRingsByOwner(builtBy);
    if (count >= limit) {
      throw new Error(`O limite de anéis por ${builtBy} foi atingido.`);
    }

    const imageUrl = this.getRandomImageUrl();

    const ring = new RingModel({
      ...params,
      imageUrl
    });

    return await ring.save();
  }
}
