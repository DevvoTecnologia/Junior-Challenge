import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateRing1726527833221 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "rings",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "nome",
            type: "varchar",
          },
          {
            name: "poder",
            type: "varchar",
          },
          {
            name: "portador",
            type: "varchar",
          },
          {
            name: "forjadoPor",
            type: "varchar",
          },
          {
            name: "imagem",
            type: "varchar",
          },
        ],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("rings");
  }
}
