import { MigrationInterface, QueryRunner } from "typeorm";

export class Cart1757723852460 implements MigrationInterface {
    name = 'Cart1757723852460'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart" ADD "requests" uuid array NOT NULL DEFAULT '{}'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart" DROP COLUMN "requests"`);
    }

}
