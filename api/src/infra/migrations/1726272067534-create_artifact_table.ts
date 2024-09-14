import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateArtifactTable1726272067534 implements MigrationInterface {
  name = 'CreateArtifactTable1726272067534'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "artifacts" ("id" character varying(21) NOT NULL, "name" character varying(255) NOT NULL, "power" character varying(255) NOT NULL, "bearer" character varying(255), "forgedBy" character varying(255), "imageUrl" character varying(255) NOT NULL, CONSTRAINT "PK_6516bbed3c129918e05c5012edb" PRIMARY KEY ("id"))`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "artifacts"`)
  }
}
