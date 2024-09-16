import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateUsersTable1726479862438 implements MigrationInterface {
  name = 'CreateUsersTable1726479862438'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" character varying(21) NOT NULL, "username" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`)
  }
}
