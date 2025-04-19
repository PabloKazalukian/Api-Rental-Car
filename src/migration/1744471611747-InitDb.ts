import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDb1744471611747 implements MigrationInterface {
    name = 'InitDb1744471611747'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."payment_automatic_enum" AS ENUM('yes', 'no')`);
        await queryRunner.query(`CREATE TABLE "payment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_ad" TIMESTAMP NOT NULL DEFAULT now(), "updated_ad" TIMESTAMP NOT NULL DEFAULT now(), "paid_date" TIMESTAMP NOT NULL, "created_time" TIMESTAMP NOT NULL, "automatic" "public"."payment_automatic_enum" NOT NULL DEFAULT 'yes', "request_id" uuid NOT NULL, CONSTRAINT "PK_fcaec7df5adf9cac408c686b2ab" PRIMARY KEY ("id")); COMMENT ON COLUMN "payment"."automatic" IS 'Whether the request is automatic or not'`);
        await queryRunner.query(`CREATE TABLE "car" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_ad" TIMESTAMP NOT NULL DEFAULT now(), "updated_ad" TIMESTAMP NOT NULL DEFAULT now(), "image" character varying NOT NULL, "brand" character varying NOT NULL, "model" character varying NOT NULL, "year" integer NOT NULL, "price" integer NOT NULL, "specifications_car_engine" character varying(80) NOT NULL DEFAULT 'V10 a 90º atmosférico de 5204 cm³ (5,2 L; 317,6 plg³)', "specifications_car_power" character varying(80) NOT NULL DEFAULT '580 a 640 CV (572 a 631 HP) (427 a 471 kW)', "specifications_car_torque" character varying(80) NOT NULL DEFAULT '540 a 600 N·m (398 a 443 lb·pie)', "specifications_car_weight" character varying(80) NOT NULL DEFAULT '1339 a 1509 kg (2952 a 3327 lb)', "specifications_car_max_speed" character varying NOT NULL DEFAULT '325 km/h (202 mph)', "specifications_car_acceleration" character varying(80) NOT NULL DEFAULT 'De 0 a 100 km/h (62 mph) en 2,9 segundos (Performante)', "specifications_car_consumption" character varying(80) NOT NULL DEFAULT '12,5 L/100 km (8 km/L; 18,8 mpgAm) (medio)', CONSTRAINT "PK_55bbdeb14e0b1d7ab417d11ee6d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "discount" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_ad" TIMESTAMP NOT NULL DEFAULT now(), "updated_ad" TIMESTAMP NOT NULL DEFAULT now(), "code_discount" character varying NOT NULL, "initial_date" TIMESTAMP NOT NULL, "expiration_date" TIMESTAMP NOT NULL, "percentage" integer NOT NULL, "status" boolean NOT NULL, "request_id" uuid, CONSTRAINT "PK_d05d8712e429673e459e7f1cddb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."request_state_enum" AS ENUM('req', 'con', 'can')`);
        await queryRunner.query(`CREATE TABLE "request" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_ad" TIMESTAMP NOT NULL DEFAULT now(), "updated_ad" TIMESTAMP NOT NULL DEFAULT now(), "amount" integer NOT NULL, "initial_date" TIMESTAMP NOT NULL, "final_date" TIMESTAMP NOT NULL, "state" "public"."request_state_enum" NOT NULL, "user_id" uuid, "car_id" uuid, CONSTRAINT "PK_167d324701e6867f189aed52e18" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('admin', 'user')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_ad" TIMESTAMP NOT NULL DEFAULT now(), "updated_ad" TIMESTAMP NOT NULL DEFAULT now(), "username" character varying NOT NULL, "password" character varying NOT NULL, "email" character varying NOT NULL, "role" "public"."user_role_enum" NOT NULL DEFAULT 'user', CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "discount_users_user" ("discount_id" uuid NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_cbb1185dca366bbe689ac32b7f7" PRIMARY KEY ("discount_id", "user_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_bf0f8d8b414871c5aa24e26f18" ON "discount_users_user" ("discount_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_072a940869985c4ed00bccc359" ON "discount_users_user" ("user_id") `);
        await queryRunner.query(`ALTER TABLE "payment" ADD CONSTRAINT "FK_b274a8e7b35dd0fd12e46e89f3c" FOREIGN KEY ("request_id") REFERENCES "request"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "discount" ADD CONSTRAINT "FK_921b6166963d6bf72867052a149" FOREIGN KEY ("request_id") REFERENCES "request"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "request" ADD CONSTRAINT "FK_3a3d93f532a056b0d89d09cdd21" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "request" ADD CONSTRAINT "FK_17b867763e55b0cfe5dc6111633" FOREIGN KEY ("car_id") REFERENCES "car"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "discount_users_user" ADD CONSTRAINT "FK_bf0f8d8b414871c5aa24e26f183" FOREIGN KEY ("discount_id") REFERENCES "discount"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "discount_users_user" ADD CONSTRAINT "FK_072a940869985c4ed00bccc359f" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "discount_users_user" DROP CONSTRAINT "FK_072a940869985c4ed00bccc359f"`);
        await queryRunner.query(`ALTER TABLE "discount_users_user" DROP CONSTRAINT "FK_bf0f8d8b414871c5aa24e26f183"`);
        await queryRunner.query(`ALTER TABLE "request" DROP CONSTRAINT "FK_17b867763e55b0cfe5dc6111633"`);
        await queryRunner.query(`ALTER TABLE "request" DROP CONSTRAINT "FK_3a3d93f532a056b0d89d09cdd21"`);
        await queryRunner.query(`ALTER TABLE "discount" DROP CONSTRAINT "FK_921b6166963d6bf72867052a149"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP CONSTRAINT "FK_b274a8e7b35dd0fd12e46e89f3c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_072a940869985c4ed00bccc359"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_bf0f8d8b414871c5aa24e26f18"`);
        await queryRunner.query(`DROP TABLE "discount_users_user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
        await queryRunner.query(`DROP TABLE "request"`);
        await queryRunner.query(`DROP TYPE "public"."request_state_enum"`);
        await queryRunner.query(`DROP TABLE "discount"`);
        await queryRunner.query(`DROP TABLE "car"`);
        await queryRunner.query(`DROP TABLE "payment"`);
        await queryRunner.query(`DROP TYPE "public"."payment_automatic_enum"`);
    }

}
