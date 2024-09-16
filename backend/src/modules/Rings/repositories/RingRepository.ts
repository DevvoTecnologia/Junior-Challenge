import { EntityRepository, Repository } from "typeorm";
import { Ring } from "../entities/Rings";

@EntityRepository(Ring)
export class RingRepository extends Repository<Ring> {
  public async countByForgedBy(forgedBy: string): Promise<number> {
    return await this.count({ where: { forgedBy } });
  }

  public async findById(id: number): Promise<Ring | null> {
    return await this.findOneBy({ id });
  }
}
