import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1726408698518 implements MigrationInterface {
    name = 'InitialMigration1726408698518'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "rings" ("id" SERIAL NOT NULL, "nome" character varying NOT NULL, "poder" character varying NOT NULL, "imagem" character varying NOT NULL, "portadorId" integer, "forjadoPorId" integer, CONSTRAINT "PK_4d35f39ef3285a233f79eb889dc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "rings" ADD CONSTRAINT "FK_3bbee99776c7908c38aa9d671d2" FOREIGN KEY ("portadorId") REFERENCES "portadores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rings" ADD CONSTRAINT "FK_1ee2b40a59da24a178b33558906" FOREIGN KEY ("forjadoPorId") REFERENCES "forjadores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rings" DROP CONSTRAINT "FK_1ee2b40a59da24a178b33558906"`);
        await queryRunner.query(`ALTER TABLE "rings" DROP CONSTRAINT "FK_3bbee99776c7908c38aa9d671d2"`);
        await queryRunner.query(`DROP TABLE "rings"`);
    }

}
