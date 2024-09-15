import { MigrationInterface, QueryRunner } from "typeorm";

export class BearerHasRingTable1726271407082 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
        await queryRunner.query(
            `CREATE TABLE bearer_has_ring (
                id uuid NOT NULL DEFAULT uuid_generate_v4(),
                bearer_id uuid NOT NULL,
                ring_id uuid NOT NULL,
                status BOOLEAN NOT NULL DEFAULT TRUE,
                start_date DATE NOT NULL,
                end_date DATE,

                CONSTRAINT pk_bearer_has_ring PRIMARY KEY (id),
                CONSTRAINT fk_bearer FOREIGN KEY (bearer_id) REFERENCES bearer (id) ON DELETE CASCADE,
                CONSTRAINT fk_ring FOREIGN KEY (ring_id) REFERENCES ring (id) ON DELETE CASCADE
            );`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS bearer_has_ring;`);
    }

}
