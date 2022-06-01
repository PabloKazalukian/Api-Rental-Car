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
    VALUES ("${initial_date}" ,"${final_date}" ,"${created_by}" ,"${rented_car}","paid" )`;

    Connect()
        .then((connection) => {
            Query(connection, query)
                .then( async(resultCreated) => {
                    logging.info(NAMESPACE, 'Request created: ', resultCreated);
                    let results = JSON.parse(JSON.stringify(resultCreated))
                    let paid_request = results.insertId
                    let priceCar = await getPriceCarById(rented_car)
                        .then((priceCar)=>{
                            let {price} = priceCar
                            return price
                        })
                    let days = getDays(initial_date,final_date)
                    let amount =  days * priceCar;
                    console.log(priceCar,paid_request,days,amount)
                    let datejs = new Date();
                    let today = `${datejs.getFullYear()}-${datejs.getMonth() + 1}-${datejs.getDate()}`;
                    let queryPayment = `INSERT INTO payment (amount,paid_date,automatic,paid_request) 
                    VALUES ("${amount}", "${today}" ,"yes" ,"${paid_request}" )`;
                    Query(connection, queryPayment)
                        .then((resultPayment)=>{
                            return res.status(200).json({
                                resultCreated,
                                resultPayment
                            });
                        })
                        .catch((error) => {
                            logging.error(NAMESPACE, error.message, error);
        
                            return res.status(403).json({
                                message: error.message,
                                error
                            });
                        })
                    
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
};

const getPriceCarById = async (carId:string):Promise<any> => {
    logging.info(NAMESPACE, 'Getting car by car_id');

    let query = `SELECT price  FROM car WHERE id_car = '${carId}'`;
    let result
    await Connect()
        .then(async (connection) => {
            await Query(connection, query)
                .then( (results) => {
                    // logging.info(NAMESPACE, 'Retrieved car: ', results);
                    result = JSON.parse(JSON.stringify(results))[0]
                })
                .catch((error) => {
                    logging.error(NAMESPACE, error.message, error);

                    return {
                        message: error.message,
                        error
                    };
                })
                .finally(() => {
                    logging.info(NAMESPACE, 'Closing connection.');
                    connection.end();
                });
        })
        .catch((error) => {
            logging.error(NAMESPACE, error.message, error);

            return {
                message: error.message,
                error
            };
        });
    return result;

};
const getDays = (f1:string,f2:string) =>{
    let aFecha1:string[] = f1.split('-');
    let aFecha2:string[] = f2.split('-');
    console.log(aFecha1,aFecha2)
    let fFecha1 = Date.UTC(parseInt( aFecha1[0],10),parseInt( aFecha1[1] ,10)-1, parseInt( aFecha1[2],10));
    let fFecha2 = Date.UTC(parseInt( aFecha2[0],10), parseInt( aFecha2[1],10)-1, parseInt( aFecha2[2],10));
    let dif = fFecha2 - fFecha1;
    let dias = Math.floor(dif / (1000 * 60 * 60 * 24));
    return dias;
 }
export default { getAllRequest,createRequest };
