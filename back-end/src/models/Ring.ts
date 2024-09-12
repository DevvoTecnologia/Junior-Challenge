import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum ForjadoPor {
    ELFOS = 'Elfos',
    ANOES = 'Anões',
    HOMENS = 'Homens',
    SAURON = 'Sauron',
}

@Entity('anel') 
export class Ring {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    nome: string;

    @Column({ length: 500 })
    poder: string;

    @Column()
    portador: string;

    @Column({
        type: 'enum',
        enum: ForjadoPor,
    })
    forjadoPor: ForjadoPor;

    @Column()
    imagem: string;
}
