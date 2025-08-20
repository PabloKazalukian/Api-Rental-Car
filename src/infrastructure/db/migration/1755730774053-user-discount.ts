import { MigrationInterface, QueryRunner } from "typeorm";

export class UserDiscount1755730774053 implements MigrationInterface {
    name = 'UserDiscount1755730774053'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "discount" DROP CONSTRAINT "FK_921b6166963d6bf72867052a149"`);
        await queryRunner.query(`ALTER TABLE "payment" RENAME COLUMN "created_time" TO "created_date"`);
        await queryRunner.query(`CREATE TYPE "public"."user_discount_status_enum" AS ENUM('available', 'used', 'expired')`);
        await queryRunner.query(`CREATE TABLE "user_discount" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "requested_date" TIMESTAMP NOT NULL, "issue_date" TIMESTAMP NOT NULL, "status" "public"."user_discount_status_enum" NOT NULL DEFAULT 'available', "user_id" uuid NOT NULL, "discount_id" uuid NOT NULL, "payment_id" uuid, CONSTRAINT "REL_65930fd37166f79d83b106a41b" UNIQUE ("payment_id"), CONSTRAINT "PK_da2d543c67c69e998df2f29eef5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_326d0acc65c9810a41ec8a4953" ON "user_discount" ("requested_date") `);
        await queryRunner.query(`CREATE INDEX "IDX_6511e86759fba269be37a4d37d" ON "user_discount" ("issue_date") `);
        await queryRunner.query(`ALTER TABLE "discount" DROP COLUMN "request_id"`);
        await queryRunner.query(`CREATE INDEX "IDX_dcdb59856918c2f322be8c6caf" ON "request" ("initial_date") `);
        await queryRunner.query(`CREATE INDEX "IDX_dc8dc0276810477b920171a6da" ON "request" ("final_date") `);
        await queryRunner.query(`CREATE INDEX "IDX_02c8a01853f79cf110782f95f2" ON "discount" ("code_discount") `);
        await queryRunner.query(`ALTER TABLE "user_discount" ADD CONSTRAINT "FK_9ba59652f7dca93ed0e2bf06956" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_discount" ADD CONSTRAINT "FK_ed10f57b4e0950367993ef93516" FOREIGN KEY ("discount_id") REFERENCES "discount"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_discount" ADD CONSTRAINT "FK_65930fd37166f79d83b106a41b1" FOREIGN KEY ("payment_id") REFERENCES "payment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_discount" DROP CONSTRAINT "FK_65930fd37166f79d83b106a41b1"`);
        await queryRunner.query(`ALTER TABLE "user_discount" DROP CONSTRAINT "FK_ed10f57b4e0950367993ef93516"`);
        await queryRunner.query(`ALTER TABLE "user_discount" DROP CONSTRAINT "FK_9ba59652f7dca93ed0e2bf06956"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_02c8a01853f79cf110782f95f2"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_dc8dc0276810477b920171a6da"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_dcdb59856918c2f322be8c6caf"`);
        await queryRunner.query(`ALTER TABLE "discount" ADD "request_id" uuid`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6511e86759fba269be37a4d37d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_326d0acc65c9810a41ec8a4953"`);
        await queryRunner.query(`DROP TABLE "user_discount"`);
        await queryRunner.query(`DROP TYPE "public"."user_discount_status_enum"`);
        await queryRunner.query(`ALTER TABLE "payment" RENAME COLUMN "created_date" TO "created_time"`);
        await queryRunner.query(`ALTER TABLE "discount" ADD CONSTRAINT "FK_921b6166963d6bf72867052a149" FOREIGN KEY ("request_id") REFERENCES "request"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
