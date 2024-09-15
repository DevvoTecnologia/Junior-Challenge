import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BearerHasRingEntity } from "./bearerhasring.entity";

export enum RingForgedByType {
  ELVES = 'ELVES',
  DWARVES = 'DWARVES',
  MEN = 'MEN',
  SAURON = 'SAURON',
}

export const RingCreatorPermissions = {
  [RingForgedByType.ELVES]: { maxCreatePermissions: 3 },
  [RingForgedByType.DWARVES]: { maxCreatePermissions: 7 },
  [RingForgedByType.MEN]: { maxCreatePermissions: 9 },
  [RingForgedByType.SAURON]: { maxCreatePermissions: 1 },
}

@Entity({ name: 'ring' })
export class RingEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  power: string;

  @Column({ name: 'forged_by' })
  forgedBy: RingForgedByType;

  @Column()
  image: string;

  @OneToMany(() => BearerHasRingEntity, (bearerHasRingEntity) => bearerHasRingEntity.ring, { cascade: ['insert'] })
  bearers: BearerHasRingEntity[];

  static create(name: string, power: string, forgedBy: RingForgedByType, image: string): RingEntity {
    const newRingEntity: RingEntity = new RingEntity();
    newRingEntity.name = name;
    newRingEntity.power = power;
    newRingEntity.forgedBy = forgedBy;
    newRingEntity.image = image;

    return newRingEntity;
  }

  update(power: string) {
    this.power = power;
  }

}
