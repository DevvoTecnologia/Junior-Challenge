import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1726337420548 implements MigrationInterface {
    name = 'InitialMigration1726337420548'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "portadores" ("id" SERIAL NOT NULL, "nome" character varying NOT NULL, CONSTRAINT "PK_ffbcdca8fc01ef7f8e72cc820ef" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "forjadores" ("id" SERIAL NOT NULL, "nome" character varying NOT NULL, "limite_aneis" integer NOT NULL, CONSTRAINT "PK_717df1ec543425bbb14063a2c83" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "rings" DROP COLUMN "portador"`);
        await queryRunner.query(`ALTER TABLE "rings" DROP COLUMN "forjadoPor"`);
        await queryRunner.query(`ALTER TABLE "rings" ADD "portadorId" integer`);
        await queryRunner.query(`ALTER TABLE "rings" ADD "forjadoPorId" integer`);
        await queryRunner.query(`ALTER TABLE "rings" ADD CONSTRAINT "FK_3bbee99776c7908c38aa9d671d2" FOREIGN KEY ("portadorId") REFERENCES "portadores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rings" ADD CONSTRAINT "FK_1ee2b40a59da24a178b33558906" FOREIGN KEY ("forjadoPorId") REFERENCES "forjadores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rings" DROP CONSTRAINT "FK_1ee2b40a59da24a178b33558906"`);
        await queryRunner.query(`ALTER TABLE "rings" DROP CONSTRAINT "FK_3bbee99776c7908c38aa9d671d2"`);
        await queryRunner.query(`ALTER TABLE "rings" DROP COLUMN "forjadoPorId"`);
        await queryRunner.query(`ALTER TABLE "rings" DROP COLUMN "portadorId"`);
        await queryRunner.query(`ALTER TABLE "rings" ADD "forjadoPor" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "rings" ADD "portador" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "forjadores"`);
        await queryRunner.query(`DROP TABLE "portadores"`);
    }

}
