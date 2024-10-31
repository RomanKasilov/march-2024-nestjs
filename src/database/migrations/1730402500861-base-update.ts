import { MigrationInterface, QueryRunner } from "typeorm";

export class BaseUpdate1730402500861 implements MigrationInterface {
    name = 'BaseUpdate1730402500861'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_cfd8e81fac09d7339a32e57d904"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_e2fe567ad8d305fefc918d44f50"`);
        await queryRunner.query(`CREATE TABLE "tags" ("created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "refresh_tokens" ("created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "accessToken" text NOT NULL, "deviceId" text NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_7d8bee0204106019488c4c50ffa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tags_posts_posts" ("tagsId" uuid NOT NULL, "postsId" uuid NOT NULL, CONSTRAINT "PK_80913b365feabf5036e3f1dd67b" PRIMARY KEY ("tagsId", "postsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_fff7d6237fcff2a66b701d6995" ON "tags_posts_posts" ("tagsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_c24352ded9a4768d79a9456ec9" ON "tags_posts_posts" ("postsId") `);
        await queryRunner.query(`ALTER TABLE "likes" DROP COLUMN "updated"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP COLUMN "body"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP COLUMN "postId"`);
        await queryRunner.query(`ALTER TABLE "posts" ADD "updated" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "posts" ADD "title" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "posts" ADD "description" text`);
        await queryRunner.query(`ALTER TABLE "posts" ADD "body" text`);
        await queryRunner.query(`ALTER TABLE "posts" ADD "user_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "likes" ADD "user_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "likes" ADD "post_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_3f519ed95f775c781a254089171" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_741df9b9b72f328a6d6f63e79ff" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" ADD CONSTRAINT "FK_3ddc983c5f7bcf132fd8732c3f4" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tags_posts_posts" ADD CONSTRAINT "FK_fff7d6237fcff2a66b701d6995e" FOREIGN KEY ("tagsId") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tags_posts_posts" ADD CONSTRAINT "FK_c24352ded9a4768d79a9456ec98" FOREIGN KEY ("postsId") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tags_posts_posts" DROP CONSTRAINT "FK_c24352ded9a4768d79a9456ec98"`);
        await queryRunner.query(`ALTER TABLE "tags_posts_posts" DROP CONSTRAINT "FK_fff7d6237fcff2a66b701d6995e"`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" DROP CONSTRAINT "FK_3ddc983c5f7bcf132fd8732c3f4"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_741df9b9b72f328a6d6f63e79ff"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_3f519ed95f775c781a254089171"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP COLUMN "post_id"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "body"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "updated"`);
        await queryRunner.query(`ALTER TABLE "likes" ADD "postId" uuid`);
        await queryRunner.query(`ALTER TABLE "likes" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "likes" ADD "body" text`);
        await queryRunner.query(`ALTER TABLE "likes" ADD "description" text`);
        await queryRunner.query(`ALTER TABLE "likes" ADD "title" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "likes" ADD "updated" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c24352ded9a4768d79a9456ec9"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fff7d6237fcff2a66b701d6995"`);
        await queryRunner.query(`DROP TABLE "tags_posts_posts"`);
        await queryRunner.query(`DROP TABLE "refresh_tokens"`);
        await queryRunner.query(`DROP TABLE "tags"`);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_e2fe567ad8d305fefc918d44f50" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_cfd8e81fac09d7339a32e57d904" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
