import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BearerHasRingEntity } from "./bearerhasring.entity";

@Entity({ name: 'bearer' })
export class BearerEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => BearerHasRingEntity, (bearerHasRingEntity) => bearerHasRingEntity.bearer)
  rings: BearerHasRingEntity[];

  static create(name: string) {
    const bearerEntity: BearerEntity = new BearerEntity();
    bearerEntity.name = name;

    return bearerEntity;
  }

}
