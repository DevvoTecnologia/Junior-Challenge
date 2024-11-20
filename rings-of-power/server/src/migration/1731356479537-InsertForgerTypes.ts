import { MigrationInterface, QueryRunner } from "typeorm";
import { TypeForger } from "../entity/Forger"; // Ajuste o caminho conforme necessário

export class InsertForgerTypes1731288860359 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO forger (tipo) VALUES
      ('${TypeForger.Elfos}'),
      ('${TypeForger.Anoes}'),
      ('${TypeForger.Homens}'),
      ('${TypeForger.Sauron}');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM forger WHERE tipo IN (
        '${TypeForger.Elfos}',
        '${TypeForger.Anoes}',
        '${TypeForger.Homens}',
        '${TypeForger.Sauron}'
      );
    `);
  }
}
