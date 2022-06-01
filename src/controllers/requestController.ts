import { NextFunction, Request, Response } from 'express';
import logging from '../config/logging';
import { Connect, Query } from '../config/mysql';
// import Car from '../interfaces/car.interface';

const NAMESPACE = 'Request';

const getAllRequest = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Getting all Request');

    let query = 
    `SELECT  r.id_request, r.initial_date, r.final_date, r.state, u.email,c.brand,c.model,c.price
    FROM request r 
    LEFT JOIN user u
    ON r.created_by = u.id_user
    LEFT JOIN car c
    ON r.rented_car = c.id_car
    `;

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

const createRequest = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Inserting request');

    let { initial_date,final_date,created_by,rented_car,state} = req.body;

    let query = `INSERT INTO request (initial_date,final_date,created_by,rented_car,state) 
    VALUES ("${initial_date}" ,"${final_date}" ,"${created_by}" ,"${rented_car}","${state}" )`;

    Connect()
        .then((connection) => {
            Query(connection, query)
                .then((result) => {
                    logging.info(NAMESPACE, 'Request created: ', result);

                    return res.status(200).json({
                        result
                    });
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


export default { getAllRequest,createRequest };
