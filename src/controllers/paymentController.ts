import { NextFunction, Request, Response } from 'express';
import logging from '../config/logging';
import { Connect, Query } from '../config/mysql';
// import Car from '../interfaces/car.interface';

const NAMESPACE = 'Payment';

const getAllPayment = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Getting all payment');


    let query = 
    `SELECT  p.amount,p.paid_date,p.automatic,r.id_request, r.initial_date, r.final_date, r.state
    FROM payment p 
    LEFT JOIN request r
    ON  p.paid_request = r.id_request
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

const createPayment = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Inserting payment');

    //     `id_payment` INT(5) NOT NULL,
    // `amount` INT NULL,
    // `paid_date` DATE NOT NULL,
    // `automatic` VARCHAR(3) NOT NULL,
    // `paid_request` INT NULL,

    let { amount,paid_date,paid_request} = req.body;

    let query = `INSERT INTO payment (amount,paid_date,automatic,paid_request) 
    VALUES ("${amount}" ,"${paid_date}" ,"yes" ,"${paid_request}" )`;

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


export default { getAllPayment,createPayment };