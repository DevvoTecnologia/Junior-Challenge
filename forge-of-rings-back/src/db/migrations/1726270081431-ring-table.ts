import { MigrationInterface, QueryRunner } from "typeorm";

export class RingTable1726270081431 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
        await queryRunner.query(
            `CREATE TABLE ring (
                id uuid NOT NULL DEFAULT uuid_generate_v4(),
                name VARCHAR(100) NOT NULL,
                power VARCHAR(300) NOT NULL,
                forged_by VARCHAR(100) NOT NULL,
                image VARCHAR(100) NOT NULL,

                CONSTRAINT pk_ring PRIMARY KEY (id)
            );`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS ring;`);
    }

}
