import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateCharactersTable1726362526485 implements MigrationInterface {
  name = 'CreateCharactersTable1726362526485'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "characters" ("id" character varying(21) NOT NULL, "name" character varying(255) NOT NULL, "description" character varying(255) NOT NULL, "imageUrl" character varying(255), CONSTRAINT "PK_9d731e05758f26b9315dac5e378" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(`ALTER TABLE "artifacts" DROP COLUMN "bearer"`)
    await queryRunner.query(
      `ALTER TABLE "artifacts" ADD "bearerId" character varying(21)`,
    )
    await queryRunner.query(
      `ALTER TABLE "artifacts" ALTER COLUMN "imageUrl" DROP NOT NULL`,
    )
    await queryRunner.query(`ALTER TABLE "artifacts" DROP COLUMN "forgedById"`)
    await queryRunner.query(
      `ALTER TABLE "artifacts" ADD "forgedById" character varying(21)`,
    )
    await queryRunner.query(
      `ALTER TABLE "artifacts" ADD CONSTRAINT "FK_4a0da02a6b7f8746a3e812c17ca" FOREIGN KEY ("bearerId") REFERENCES "characters"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "artifacts" ADD CONSTRAINT "FK_7b47c1cf117f0ba8c9d32a2f7bd" FOREIGN KEY ("forgedById") REFERENCES "smiths"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "artifacts" DROP CONSTRAINT "FK_7b47c1cf117f0ba8c9d32a2f7bd"`,
    )
    await queryRunner.query(
      `ALTER TABLE "artifacts" DROP CONSTRAINT "FK_4a0da02a6b7f8746a3e812c17ca"`,
    )
    await queryRunner.query(`ALTER TABLE "artifacts" DROP COLUMN "forgedById"`)
    await queryRunner.query(
      `ALTER TABLE "artifacts" ADD "forgedById" character varying(255)`,
    )
    await queryRunner.query(
      `ALTER TABLE "artifacts" ALTER COLUMN "imageUrl" SET NOT NULL`,
    )
    await queryRunner.query(`ALTER TABLE "artifacts" DROP COLUMN "bearerId"`)
    await queryRunner.query(
      `ALTER TABLE "artifacts" ADD "bearer" character varying(255)`,
    )
    await queryRunner.query(`DROP TABLE "characters"`)
  }
}
