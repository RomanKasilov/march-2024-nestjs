import { MigrationInterface, QueryRunner } from "typeorm";

export class RefTokenFix1730646486782 implements MigrationInterface {
    name = 'RefTokenFix1730646486782'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "refresh_tokens" RENAME COLUMN "accessToken" TO "refreshToken"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "refresh_tokens" RENAME COLUMN "refreshToken" TO "accessToken"`);
    }

}
