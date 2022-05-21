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
    mail VARCHAR(40),
    role VARCHAR(5),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)


DESCRIBE car;
