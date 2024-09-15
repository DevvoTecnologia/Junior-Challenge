import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from "typeorm"
import { Ring } from "./ring"

@Entity("forgers")
export class Forger {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ name: "name", type: "text", nullable: false })
    name: string
    
    @Column({ name: "maxRings", type: "int", nullable: false })
    maxRings: number

    @OneToMany(() => Ring, (ring) => ring.forger)
    rings: Ring[]

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