import { MigrationInterface, QueryRunner } from "typeorm";

export class InitMigration1730128333484 implements MigrationInterface {
    name = 'InitMigration1730128333484'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" text NOT NULL, "lastName" text NOT NULL, "age" integer, CONSTRAINT "PK_46c438e5a956fb9c3e86e73e321" PRIMARY KEY ("_id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
