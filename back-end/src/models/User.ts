import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('usuario')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    login: string;

    @Column()
    senha: string;

}
