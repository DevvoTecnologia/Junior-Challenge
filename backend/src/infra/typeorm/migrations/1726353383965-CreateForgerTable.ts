import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateForgerTable1726353383965 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "forgers",
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
                        name: "maxRings",
                        type: "int",
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
                        name: "forgerId",
                        type: "char",
                        length: "36",
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

        await queryRunner.createForeignKey("rings", new TableForeignKey({
            columnNames: ["forgerId"],
            referencedColumnNames: ["id"],
            referencedTableName: "forgers",
            onDelete: "CASCADE",
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("rings");
        await queryRunner.dropTable("forgers");
    }

}