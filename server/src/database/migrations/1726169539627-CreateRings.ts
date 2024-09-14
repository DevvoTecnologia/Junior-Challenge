import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { ForgedBy } from '../../entities/Ring';

export class CreateRings1726169539627 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'rings',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'power',
            type: 'varchar',
          },
          {
            name: 'owner',
            type: 'varchar',
          },
          {
            name: 'forgedBy',
            type: 'enum',
            enum: [
              ForgedBy.ELVES,
              ForgedBy.DWARVES,
              ForgedBy.MEN,
              ForgedBy.SAURON,
            ],
          },
          {
            name: 'image',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('rings');
  }
}
