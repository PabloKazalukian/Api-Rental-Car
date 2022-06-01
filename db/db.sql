CREATE DATABASE IF NOT EXISTS rental_car_db;

USE rental_car_db;

CREATE TABLE car(
    id_car INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    image VARCHAR(200),
    brand VARCHAR(120),
    model VARCHAR(120),
    year INT(4), 
    price int(5),
    engine VARCHAR(80),
    power VARCHAR(80),
    torque VARCHAR(80),
    weight VARCHAR(80),
    max_speed VARCHAR(80),
    acceleration VARCHAR(80),
    consumption VARCHAR(80),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

CREATE TABLE user(
    id_user INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(40),
    password VARCHAR(40),
    email VARCHAR(40),
    role VARCHAR(5),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)


CREATE TABLE IF NOT EXISTS `rental_car_db`.`request` (
  `id_request` INT(5) NOT NULL AUTO_INCREMENT,
  `initial_date` DATE NULL,
  `final_date` DATE NULL,
  `created_by` INT NULL,
  `rented_car` INT NULL,
  `state` VARCHAR(6) NOT NULL,
  `create_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_request`),
  UNIQUE INDEX `id_request_UNIQUE` (`id_request` ASC) VISIBLE,
  INDEX `rented_car_idx` (`rented_car` ASC) VISIBLE,
  INDEX `created_by_idx` (`created_by` ASC) VISIBLE,
  CONSTRAINT `created_by`
    FOREIGN KEY (`created_by`)
    REFERENCES `rental_car_db`.`user` (`id_user`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `rented_car`
    FOREIGN KEY (`rented_car`)
    REFERENCES `rental_car_db`.`car` (`id_car`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)

CREATE TABLE IF NOT EXISTS `rental_car_db`.`payment` (
  `id_payment` INT(5) NOT NULL,
  `amount` INT NULL,
  `paid_date` DATE NOT NULL,
  `automatic` VARCHAR(3) NOT NULL,
  `paid_request` INT NULL,
  `create_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX `paid_request_idx` (`paid_request` ASC) VISIBLE,
  CONSTRAINT `paid_request`
    FOREIGN KEY (`paid_request`)
    REFERENCES `rental_car_db`.`request` (`id_request`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)

DESCRIBE car;
