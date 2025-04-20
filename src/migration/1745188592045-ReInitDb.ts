import { MigrationInterface, QueryRunner } from "typeorm";

export class ReInitDb1745188592045 implements MigrationInterface {
    name = 'ReInitDb1745188592045'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "discount" DROP COLUMN "created_ad"`);
        await queryRunner.query(`ALTER TABLE "discount" DROP COLUMN "updated_ad"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "created_ad"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updated_ad"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "created_ad"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "updated_ad"`);
        await queryRunner.query(`ALTER TABLE "car" DROP COLUMN "created_ad"`);
        await queryRunner.query(`ALTER TABLE "car" DROP COLUMN "updated_ad"`);
        await queryRunner.query(`ALTER TABLE "request" DROP COLUMN "created_ad"`);
        await queryRunner.query(`ALTER TABLE "request" DROP COLUMN "updated_ad"`);
        await queryRunner.query(`ALTER TABLE "discount" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "discount" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "car" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "car" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "request" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "request" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "request" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "request" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "car" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "car" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "discount" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "discount" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "request" ADD "updated_ad" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "request" ADD "created_ad" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "car" ADD "updated_ad" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "car" ADD "created_ad" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "updated_ad" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "created_ad" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ADD "updated_ad" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ADD "created_ad" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "discount" ADD "updated_ad" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "discount" ADD "created_ad" TIMESTAMP NOT NULL DEFAULT now()`);
    }

}
