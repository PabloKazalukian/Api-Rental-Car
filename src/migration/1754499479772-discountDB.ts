import { MigrationInterface, QueryRunner } from "typeorm";

export class DiscountDB1754499479772 implements MigrationInterface {
    name = 'DiscountDB1754499479772'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."discount_type_enum" AS ENUM('percentage', 'fixed')`);
        await queryRunner.query(`ALTER TABLE "discount" ADD "type" "public"."discount_type_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "discount" ADD "amount" double precision`);
        await queryRunner.query(`CREATE TYPE "public"."user_type_enum" AS ENUM('local', 'google', 'github', 'microsoft')`);
        await queryRunner.query(`ALTER TABLE "user" ADD "type" "public"."user_type_enum" NOT NULL DEFAULT 'local'`);
        await queryRunner.query(`ALTER TABLE "discount" DROP COLUMN "percentage"`);
        await queryRunner.query(`ALTER TABLE "discount" ADD "percentage" double precision`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "discount" DROP COLUMN "percentage"`);
        await queryRunner.query(`ALTER TABLE "discount" ADD "percentage" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "type"`);
        await queryRunner.query(`DROP TYPE "public"."user_type_enum"`);
        await queryRunner.query(`ALTER TABLE "discount" DROP COLUMN "amount"`);
        await queryRunner.query(`ALTER TABLE "discount" DROP COLUMN "type"`);
        await queryRunner.query(`DROP TYPE "public"."discount_type_enum"`);
    }

}
