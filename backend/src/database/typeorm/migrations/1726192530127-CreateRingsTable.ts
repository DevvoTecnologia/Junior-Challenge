import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateTaskTable1718032596042 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "rings",
                columns: [
                    {
                        name: "id",
                        type: "char",
                        length: "36",
                        isPrimary: true,
                        generationStrategy: "uuid",
                    },
                    {
                        name: "name",
                        type: "text",
                        isNullable: false,
                    },
                    {
                        name: "power",
                        type: "text",
                        isNullable: false,
                    },
                    {
                        name: "proprietor",
                        type: "text",
                        isNullable: false,
                    },
                    {
                        name: "image",
                        type: "text",
                        isNullable: false,
                    },
                    {
                        name: "forgedBy",
                        type: "enum",
                        enum: ["elf", "dwarf", "man", "sauron"],
                        isNullable: false,
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                        isNullable: false,
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()",
                        isNullable: false,
                    },
                ],
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("tasks")
    }
}