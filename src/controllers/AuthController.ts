import { NextFunction, Request, Response } from 'express';
import logging from '../config/logging';
import { Connect, Query } from '../config/mysql';
// import Car from '../interfaces/car.interface';
import bcryptjs from 'bcryptjs';
import controller from '../controllers/userController';
import { User } from '../interfaces/user.interface';
import jwt from 'jsonwebtoken';



const NAMESPACE = 'Auth';


const findUserLogin = async (req: Request, res: Response, next: NextFunction) => {

    logging.info(NAMESPACE, 'Getting user by email');

    let {email,password} = req.body;
    if(email !== undefined && password !== undefined){

        let query = `SELECT username,password,email,role,id_user FROM user WHERE email = '${email}'`;

        Connect()
            .then((connection) => {
                Query(connection, query)
                    .then((results: any) => {
                        // logging.info(NAMESPACE, 'Retrieved car: ', results);
                        if(results.length > 0){
                            let [user] = results
                            if(bcryptjs.compareSync(password,user.password)){
                                let token = jwt.sign({usedId:user.id_user,username:user.username},'SECRETO',{expiresIn:'1h'})
                                return res.status(200).json({message:'ok',token});
                            }else{
                                throw new TypeError('no encontrado')
                            }
                        } else{
                            throw new TypeError('no encontrado')
                        }
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

                return res.status(200).json({
                    message: error.message,
                    error
                });
            });
    } else{
        return res.status(404).json({
            message: 'Error: Faltan datos '
        });
    }
};

export default { findUserLogin };
