import { MigrationInterface, QueryRunner } from "typeorm";

export class BearerTable1726271309327 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
        await queryRunner.query(
            `CREATE TABLE bearer (
                id uuid NOT NULL DEFAULT uuid_generate_v4(),
                name VARCHAR(100) NOT NULL,

                CONSTRAINT pk_bearer PRIMARY KEY (id)
            );`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS bearer;`);
    }

}
