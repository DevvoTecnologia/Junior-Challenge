import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateRingPower1726229499926 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "ring",
                columns: [
                    {
                        name: "id",
                        type: "varchar",
                        isPrimary: true,
                        generationStrategy: "uuid",
                    },
                    {
                        name: "name",
                        type: "varchar",
                    },
                    {
                        name: "power",
                        type: "varchar",
                    },
                    {
                        name: "carrier",
                        type: "varchar",
                    },
                    {
                        name: "forged_by",
                        type: "varchar",
                    },
                    {
                        name: "image",
                        type: "varchar",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                    }
                ]
            })

        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('ring')
    }

}
