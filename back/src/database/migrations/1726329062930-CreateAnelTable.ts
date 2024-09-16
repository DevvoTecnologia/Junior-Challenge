import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAnelTable1726329062930 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "anel" (
                "id" int NOT NULL AUTO_INCREMENT,
                "name" varchar(100) NOT NULL,
                "power" varchar(100) NOT NULL,
                "holder" varchar(100) NOT NULL,
                "forger" varchar(50) NOT NULL,
                "forjador" enum ('Elfos', 'Anões', 'Homens', 'Sauron') NOT NULL,
                PRIMARY KEY ("id")
            )
        `);        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
