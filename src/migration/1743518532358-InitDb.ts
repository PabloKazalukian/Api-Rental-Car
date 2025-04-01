import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDb1743518532358 implements MigrationInterface {
    name = 'InitDb1743518532358'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`discount\` (\`id\` varchar(36) NOT NULL, \`created_ad\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_ad\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`code_discount\` varchar(255) NOT NULL, \`initial_date\` datetime NOT NULL, \`expiration_date\` datetime NOT NULL, \`percentage\` int NOT NULL, \`status\` tinyint NOT NULL, \`request_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` varchar(36) NOT NULL, \`created_ad\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_ad\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`username\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`role\` enum ('admin', 'user') NOT NULL DEFAULT 'user', UNIQUE INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` (\`username\`), UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`payment\` (\`id\` varchar(36) NOT NULL, \`created_ad\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_ad\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`paid_date\` datetime NOT NULL, \`created_time\` datetime NOT NULL, \`automatic\` enum ('yes', 'no') NOT NULL COMMENT 'Whether the request is automatic or not' DEFAULT 'yes', \`request_id\` varchar(36) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`car\` (\`id\` varchar(36) NOT NULL, \`created_ad\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_ad\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`image\` varchar(255) NOT NULL, \`brand\` varchar(255) NOT NULL, \`model\` varchar(255) NOT NULL, \`year\` int NOT NULL, \`price\` int NOT NULL, \`specifications_car_engine\` varchar(80) NOT NULL DEFAULT 'V10 a 90º atmosférico de 5204 cm³ (5,2 L; 317,6 plg³)', \`specifications_car_power\` varchar(80) NOT NULL DEFAULT '580 a 640 CV (572 a 631 HP) (427 a 471 kW)', \`specifications_car_torque\` varchar(80) NOT NULL DEFAULT '540 a 600 N·m (398 a 443 lb·pie)', \`specifications_car_weight\` varchar(80) NOT NULL DEFAULT '1339 a 1509 kg (2952 a 3327 lb)', \`specifications_car_max_speed\` varchar(255) NOT NULL DEFAULT '325 km/h (202 mph)', \`specifications_car_acceleration\` varchar(80) NOT NULL DEFAULT 'De 0 a 100 km/h (62 mph) en 2,9 segundos (Performante)', \`specifications_car_consumption\` varchar(80) NOT NULL DEFAULT '12,5 L/100 km (8 km/L; 18,8 mpgAm) (medio)', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`request\` (\`id\` varchar(36) NOT NULL, \`created_ad\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_ad\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`amount\` int NOT NULL, \`initial_date\` datetime NOT NULL, \`final_date\` datetime NOT NULL, \`state\` enum ('req', 'con', 'can') NOT NULL, \`user_id\` varchar(36) NULL, \`car_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`discount_users_user\` (\`discount_id\` varchar(36) NOT NULL, \`user_id\` varchar(36) NOT NULL, INDEX \`IDX_bf0f8d8b414871c5aa24e26f18\` (\`discount_id\`), INDEX \`IDX_072a940869985c4ed00bccc359\` (\`user_id\`), PRIMARY KEY (\`discount_id\`, \`user_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`discount\` ADD CONSTRAINT \`FK_921b6166963d6bf72867052a149\` FOREIGN KEY (\`request_id\`) REFERENCES \`request\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`payment\` ADD CONSTRAINT \`FK_b274a8e7b35dd0fd12e46e89f3c\` FOREIGN KEY (\`request_id\`) REFERENCES \`request\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`request\` ADD CONSTRAINT \`FK_3a3d93f532a056b0d89d09cdd21\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`request\` ADD CONSTRAINT \`FK_17b867763e55b0cfe5dc6111633\` FOREIGN KEY (\`car_id\`) REFERENCES \`car\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`discount_users_user\` ADD CONSTRAINT \`FK_bf0f8d8b414871c5aa24e26f183\` FOREIGN KEY (\`discount_id\`) REFERENCES \`discount\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`discount_users_user\` ADD CONSTRAINT \`FK_072a940869985c4ed00bccc359f\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`discount_users_user\` DROP FOREIGN KEY \`FK_072a940869985c4ed00bccc359f\``);
        await queryRunner.query(`ALTER TABLE \`discount_users_user\` DROP FOREIGN KEY \`FK_bf0f8d8b414871c5aa24e26f183\``);
        await queryRunner.query(`ALTER TABLE \`request\` DROP FOREIGN KEY \`FK_17b867763e55b0cfe5dc6111633\``);
        await queryRunner.query(`ALTER TABLE \`request\` DROP FOREIGN KEY \`FK_3a3d93f532a056b0d89d09cdd21\``);
        await queryRunner.query(`ALTER TABLE \`payment\` DROP FOREIGN KEY \`FK_b274a8e7b35dd0fd12e46e89f3c\``);
        await queryRunner.query(`ALTER TABLE \`discount\` DROP FOREIGN KEY \`FK_921b6166963d6bf72867052a149\``);
        await queryRunner.query(`DROP INDEX \`IDX_072a940869985c4ed00bccc359\` ON \`discount_users_user\``);
        await queryRunner.query(`DROP INDEX \`IDX_bf0f8d8b414871c5aa24e26f18\` ON \`discount_users_user\``);
        await queryRunner.query(`DROP TABLE \`discount_users_user\``);
        await queryRunner.query(`DROP TABLE \`request\``);
        await queryRunner.query(`DROP TABLE \`car\``);
        await queryRunner.query(`DROP TABLE \`payment\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`discount\``);
    }

}
