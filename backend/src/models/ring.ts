import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm"

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

    @Column({
        name: "forgedBy",
        type: "enum",
        enum: [
            "elf",
            "dwarf",
            "Man",
            "sauron"
        ]
    })
    forgedBy: string

    @Column({ name: "image", type: "text", nullable: false })
    image: string

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