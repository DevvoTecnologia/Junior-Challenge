import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1726335675595 implements MigrationInterface {
    name = 'InitialMigration1726335675595'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "rings" ("id" SERIAL NOT NULL, "nome" character varying NOT NULL, "poder" character varying NOT NULL, "portador" character varying NOT NULL, "forjadoPor" character varying NOT NULL, "imagem" character varying NOT NULL, CONSTRAINT "PK_4d35f39ef3285a233f79eb889dc" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "rings"`);
    }

}
