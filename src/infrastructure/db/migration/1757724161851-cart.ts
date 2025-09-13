import { MigrationInterface, QueryRunner } from "typeorm";

export class Cart1757724161851 implements MigrationInterface {
    name = 'Cart1757724161851'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart" DROP CONSTRAINT "FK_f091e86a234693a49084b4c2c86"`);
        await queryRunner.query(`ALTER TABLE "cart" RENAME COLUMN "user_id" TO "user"`);
        await queryRunner.query(`ALTER TABLE "cart" ADD CONSTRAINT "FK_8e609177e02bed8b0c23834e083" FOREIGN KEY ("user") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart" DROP CONSTRAINT "FK_8e609177e02bed8b0c23834e083"`);
        await queryRunner.query(`ALTER TABLE "cart" RENAME COLUMN "user" TO "user_id"`);
        await queryRunner.query(`ALTER TABLE "cart" ADD CONSTRAINT "FK_f091e86a234693a49084b4c2c86" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
