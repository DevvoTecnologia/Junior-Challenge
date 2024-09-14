import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import bcrypt from 'bcryptjs';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  async setPassword(password: string) {
    this.password = await bcrypt.hash(password, 10);
  }

  async checkPassword(password: string) {
    return await bcrypt.compare(password, this.password);
  }
}
