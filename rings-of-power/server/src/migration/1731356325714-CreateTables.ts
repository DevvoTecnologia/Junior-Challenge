import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1731288860359 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE forger (
        id INT AUTO_INCREMENT NOT NULL,
        tipo ENUM('Elfos', 'Anoes', 'Homens', 'Sauron') NOT NULL,
        PRIMARY KEY (id)
      );
    `);

    await queryRunner.query(`
      CREATE TABLE holder (
        id INT AUTO_INCREMENT NOT NULL,
        nome VARCHAR(255) NOT NULL,
        PRIMARY KEY (id)
      );
    `);

    await queryRunner.query(`
      CREATE TABLE ring (
        id INT AUTO_INCREMENT NOT NULL,
        nome VARCHAR(255) NOT NULL,
        poder TEXT NOT NULL,
        imagem VARCHAR(255) NOT NULL,
        forjadoPorId INT NOT NULL,
        portadorId INT NOT NULL,
        PRIMARY KEY (id),
        CONSTRAINT FK_forjadoPor FOREIGN KEY (forjadoPorId) REFERENCES forger(id) ON DELETE CASCADE,
        CONSTRAINT FK_portador FOREIGN KEY (portadorId) REFERENCES holder(id) ON DELETE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE ring DROP FOREIGN KEY FK_portador;
    `);

    await queryRunner.query(`
      ALTER TABLE ring DROP FOREIGN KEY FK_forjadoPor;
    `);

    await queryRunner.query(`
      DROP TABLE ring;
    `);

    await queryRunner.query(`
      DROP TABLE holder;
    `);

    await queryRunner.query(`
      DROP TABLE forger;
    `);
  }
}
