import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Rings1726167049299 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);

    await queryRunner.createTable(
      new Table({
        name: "rings",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            isGenerated: true,
            default: "uuid_generate_v4()",
          },
          {
            name: "name",
            type: "varchar",
            length: "225",
          },
          {
            name: "power",
            type: "text",
          },
          {
            name: "carrier",
            type: "varchar",
            length: "225",
          },
          {
            name: "forgedBy",
            type: "varchar",
            length: "225",
          },
          {
            name: "image_url",
            type: "text",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("rings");
  }
}
