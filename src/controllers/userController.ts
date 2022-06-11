import { NextFunction, Request, Response } from 'express';
import logging from '../config/logging';
import { Connect, Query } from '../config/mysql';
// import Car from '../interfaces/car.interface';
import bcryptjs from 'bcryptjs';

const NAMESPACE = 'User';

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Getting all user');

    let query = 'SELECT username,email,role,password  FROM user';

    Connect()
        .then((connection) => {
            Query(connection, query)
                .then((results) => {
                    // logging.info(NAMESPACE, 'Retrieved car: ', results);

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

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Inserting user');

    let { username,password,email} = req.body;

    const salt = bcryptjs.genSaltSync(8)
    password =  bcryptjs.hashSync(password,salt)

    let query = `INSERT INTO user (username,password,email,role) 
    VALUES ("${username}", "${password}", "${email}","user")`;

    Connect()
        .then((connection) => {
            Query(connection, query)
                .then((result) => {
                    logging.info(NAMESPACE, 'User created: ', result);

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

const modifyPassword = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Modify password of a user');
    let {idUser} = req.params;
    let {newPass} = req.body;
    const salt = bcryptjs.genSaltSync(8)
    newPass =  bcryptjs.hashSync(newPass,salt)
    let query = `UPDATE user SET password = '${newPass}'  WHERE id_user = ${idUser}`;
    Connect()
        .then((connection) => {
            Query(connection, query)
                .then((results) => {
                    // logging.info(NAMESPACE, 'Retrieved car: ', results);
                    let result = JSON.parse(JSON.stringify(results))
                    if(result.changedRows === 0){
                        throw new TypeError('no encontrado')
                    }
                    return res.status(200).json(results);
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

            return res.status(500).json({
                message: error.message,
                error
            });
        });
};



export default { createUser,getAllUsers,modifyPassword };