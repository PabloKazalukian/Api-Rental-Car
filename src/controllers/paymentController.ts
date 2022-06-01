import { NextFunction, Request, Response } from 'express';
import logging from '../config/logging';
import { Connect, Query } from '../config/mysql';
// import Car from '../interfaces/car.interface';

const NAMESPACE = 'Payment';

const getAllRequest = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Getting all payment');


    //     `id_payment` INT(5) NOT NULL,
    // `amount` INT NULL,
    // `paid_date` DATE NOT NULL,
    // `automatic` VARCHAR(3) NOT NULL,
    // `paid_request` INT NULL,
    let query = 
    `SELECT  p.amount,p.paid_date,p.automatic,r.id_request, r.initial_date, r.final_date, r.state, u.email
    FROM payment p 
    LEFT JOIN request r
    ON  p.paid_request = r.created_by 
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
    logging.info(NAMESPACE, 'Inserting payment');

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