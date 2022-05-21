import { NextFunction, Request, Response } from 'express';
import logging from '../config/logging';
import { Connect, Query } from '../config/mysql';
// import Car from '../interfaces/car.interface';
import bcryptjs from 'bcryptjs';
import controller from '../controllers/userController';
import { User } from '../interfaces/user.interface';


const NAMESPACE = 'Auth';


const findUserByEmail = async (req: Request, res: Response, next: NextFunction) => {

    logging.info(NAMESPACE, 'Getting user by email');

    let {email} = req.body;
    if(email !== undefined){

        let query = `SELECT username,password,email,role FROM user WHERE email = '${email}'`;

        Connect()
            .then((connection) => {
                Query(connection, query)
                    .then((results: any) => {
                        // logging.info(NAMESPACE, 'Retrieved car: ', results);
                        if(results.length > 0){
                            return res.status(200).json(results);
                        } else{
                            throw new TypeError('no econtrado')
                        }
                    })
                    .catch((error) => {
                        logging.error(NAMESPACE, error.message, error);

                        return res.status(404).json({
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
    } else{
        return res.status(404).json({
            message: 'no encontrado'
        });
    }
};

export default { findUserByEmail };
