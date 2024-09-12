import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
import bcrypt from 'bcrypt';
@Entity('usuario')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    login: string;

    @Column()
    senha: string;


      @BeforeInsert()
      async hashPassword() {
          const saltRounds = 10; 
          this.senha = await bcrypt.hash(this.senha, saltRounds);
      }
  
      async comparePassword(password: string): Promise<boolean> {
          return bcrypt.compare(password, this.senha);
      }
}
