import { NextFunction, Request, Response } from 'express';
import logging from '../config/logging';
import { Connect, Query } from '../config/mysql';
import { Connection } from 'mysql';
// import Car from '../interfaces/car.interface';


const NAMESPACE = 'Car';

const getAllCars = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Getting all car');

    let query: string = 'SELECT * FROM car';

    Connect()
        .then((connection) => {
            Query(connection, query)
                .then((results) => {
                    // logging.info(NAMESPACE, 'Retrieved car: ', results);

                    return res.status(200).json(results);
                })
                .catch((error) => {
                    logging.error(NAMESPACE, error.message, error);

                    return res.status(500).json({
                        message: error.message,
                        error
                    });
                })
                .finally(() => {
                    logging.info(NAMESPACE, 'Closing connection.');
                    connection.end();
                });
        })
        .catch((error) => {
            logging.error(NAMESPACE, error.message, error);

            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

const getCarById = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Getting car by id');
    const { id } = req.params;

    let query: string = `SELECT * FROM car WHERE id_car = ${id}`;

    Connect()
        .then((connection: Connection) => {
            Query(connection, query)
                .then((results) => {
                    console.log(results);
                    return res.status(200).json(results);
                })
                .catch((error) => {
                    logging.error(NAMESPACE, error.message, error);

                    return res.status(200).json({
                        message: error.message,
                        error
                    });
                })
                .finally(() => {
                    logging.info(NAMESPACE, 'Closing connection.');
                    connection.end();
                });
        })
        .catch((error) => {
            logging.error(NAMESPACE, error.message, error);

            return res.status(200).json({
                message: error.message,
                error
            });
        });
};

const createCar = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Inserting car');

    let { image, brand, model, year, price, specifications } = req.body;
    let { engine, power, torque, weight, max_speed, acceleration, consumption } = specifications;

    let query = `INSERT INTO car (image,brand,model,year,price,engine,power,torque,weight,max_speed,acceleration,consumption) 
    VALUES ("${image}", "${brand}", "${model}", "${year}", "${price}", "${engine}" ,"${power}" ,"${torque}" ,"${weight}" ,"${max_speed}" ,"${acceleration}" ,"${consumption}")`;

    Connect()
        .then((connection) => {
            Query(connection, query)
                .then((result) => {
                    logging.info(NAMESPACE, 'Car created: ', result);

                    return res.status(200).json({
                        result
                    });
                })
                .catch((error) => {
                    logging.error(NAMESPACE, error.message, error);

                    return res.status(400).json({
                        message: error.message,
                        error
                    });
                })
                .finally(() => {
                    logging.info(NAMESPACE, 'Closing connection.');
                    connection.end();
                });
        })
        .catch((error) => {
            logging.error(NAMESPACE, error.message, error);

            return res.status(404).json({
                message: error.message,
                error
            });
        });
};

export default { createCar, getAllCars, getCarById };