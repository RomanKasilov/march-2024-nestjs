import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIndex1731439421224 implements MigrationInterface {
    name = 'AddIndex1731439421224'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_723da61de46f65bb3e3096750d" ON "likes" ("user_id", "post_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_51b8b26ac168fbe7d6f5653e6c" ON "users" ("name") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_51b8b26ac168fbe7d6f5653e6c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_723da61de46f65bb3e3096750d"`);
    }

}
