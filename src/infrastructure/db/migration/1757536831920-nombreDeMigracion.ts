import { MigrationInterface, QueryRunner } from "typeorm";

export class NombreDeMigracion1757536831920 implements MigrationInterface {
    name = 'NombreDeMigracion1757536831920'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cart" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid, CONSTRAINT "REL_f091e86a234693a49084b4c2c8" UNIQUE ("user_id"), CONSTRAINT "PK_c524ec48751b9b5bcfbf6e59be7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "user_discount_id" uuid`);
        await queryRunner.query(`ALTER TABLE "payment" ADD CONSTRAINT "UQ_c7c8cca330bc991544d999fb0f0" UNIQUE ("user_discount_id")`);
        await queryRunner.query(`ALTER TABLE "request" ADD "cart_id" uuid`);
        await queryRunner.query(`ALTER TABLE "discount" ALTER COLUMN "percentage" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "discount" ALTER COLUMN "amount" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "payment" DROP CONSTRAINT "FK_b274a8e7b35dd0fd12e46e89f3c"`);
        await queryRunner.query(`ALTER TABLE "payment" ADD CONSTRAINT "UQ_b274a8e7b35dd0fd12e46e89f3c" UNIQUE ("request_id")`);
        await queryRunner.query(`ALTER TABLE "payment" ADD CONSTRAINT "FK_b274a8e7b35dd0fd12e46e89f3c" FOREIGN KEY ("request_id") REFERENCES "request"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payment" ADD CONSTRAINT "FK_c7c8cca330bc991544d999fb0f0" FOREIGN KEY ("user_discount_id") REFERENCES "user_discount"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart" ADD CONSTRAINT "FK_f091e86a234693a49084b4c2c86" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "request" ADD CONSTRAINT "FK_1ec8f7b5a3a53056cb6a400cb31" FOREIGN KEY ("cart_id") REFERENCES "cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "request" DROP CONSTRAINT "FK_1ec8f7b5a3a53056cb6a400cb31"`);
        await queryRunner.query(`ALTER TABLE "cart" DROP CONSTRAINT "FK_f091e86a234693a49084b4c2c86"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP CONSTRAINT "FK_c7c8cca330bc991544d999fb0f0"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP CONSTRAINT "FK_b274a8e7b35dd0fd12e46e89f3c"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP CONSTRAINT "UQ_b274a8e7b35dd0fd12e46e89f3c"`);
        await queryRunner.query(`ALTER TABLE "payment" ADD CONSTRAINT "FK_b274a8e7b35dd0fd12e46e89f3c" FOREIGN KEY ("request_id") REFERENCES "request"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "discount" ALTER COLUMN "amount" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "discount" ALTER COLUMN "percentage" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "request" DROP COLUMN "cart_id"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP CONSTRAINT "UQ_c7c8cca330bc991544d999fb0f0"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "user_discount_id"`);
        await queryRunner.query(`DROP TABLE "cart"`);
    }

}
