import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateSmithsTable1726356852833 implements MigrationInterface {
  name = 'CreateSmithsTable1726356852833'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "artifacts" RENAME COLUMN "forgedBy" TO "forgedById"`,
    )
    await queryRunner.query(
      `CREATE TABLE "smiths" ("id" character varying(21) NOT NULL, "name" character varying(255) NOT NULL, "description" character varying(255), "itemLimit" integer NOT NULL, CONSTRAINT "PK_fa712d939b976a653f20a36d6e4" PRIMARY KEY ("id"))`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "smiths"`)
    await queryRunner.query(
      `ALTER TABLE "artifacts" RENAME COLUMN "forgedById" TO "forgedBy"`,
    )
  }
}
