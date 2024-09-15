import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from "typeorm"
import { Forger } from "./forger"

@Entity("rings")
export class Ring {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ name: "name", type: "text", nullable: false })
    name: string

    @Column({ name: "power", type: "text", nullable: false })
    power: string

    @Column({ name: "proprietor", type: "text", nullable: false })
    proprietor: string

    @Column({ name: "image", type: "text", nullable: false })
    image: string

    @ManyToOne(() => Forger, (forger) => forger.rings)
    forger: Forger

    @CreateDateColumn({
        name: "created_at",
        type: "timestamp",
        nullable: false,
    })
    createdAt: Date

    @CreateDateColumn({
        name: "updated_at",
        type: "timestamp",
        nullable: false,
    })
    updatedAt: Date
}