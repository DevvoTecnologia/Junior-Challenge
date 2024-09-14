import { MongoCreateRingRepository } from '../../repositories/create-ring/mongo-create-ring';
import { Rings } from '../../models/rings';

export class CreateRingController {
  constructor(private ringRepository: MongoCreateRingRepository) {}

  public async handle(req: { body: Rings }) {
    try {
      const { body } = req;
      const ring = await this.ringRepository.createRing(body);
      return { body: ring, statusCode: 201 };
    } catch (error) {
      return { body: { error}, statusCode: 400 };
    }
  }
}
