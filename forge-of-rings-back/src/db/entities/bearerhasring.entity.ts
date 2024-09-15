import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, JoinColumn } from 'typeorm';
import { BearerEntity } from './bearer.entity';
import { RingEntity } from './ring.entity';

@Entity('bearer_has_ring')
export class BearerHasRingEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'bearer_id', type: 'uuid' })
  bearerId: string;

  @Column({ name: 'ring_id', type: 'uuid' })
  ringId: string;

  @Column()
  status: boolean;

  @Column({ name: 'start_date' })
  startDate: Date;

  @Column({ name: 'end_date' })
  endDate: Date;

  @ManyToOne(() => BearerEntity, (bearer) => bearer.rings)
  @JoinColumn({ name: 'bearer_id' })
  bearer: BearerEntity;

  @ManyToOne(() => RingEntity, (ring) => ring.bearers)
  @JoinColumn({ name: 'ring_id' })
  ring: RingEntity;

  static create(bearerId: string, ringId: string) {
    const bearerHasRingEntity: BearerHasRingEntity = new BearerHasRingEntity();
    bearerHasRingEntity.bearerId = bearerId;
    bearerHasRingEntity.ringId = ringId;
    bearerHasRingEntity.status = true;
    bearerHasRingEntity.startDate = new Date();

    return bearerHasRingEntity;
  }

}
