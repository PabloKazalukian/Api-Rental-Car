"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logging_1 = __importDefault(require("../config/logging"));
const mysql_1 = require("../config/mysql");
// import Car from '../interfaces/car.interface';
const NAMESPACE = 'Request';
const getAllRequest = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    logging_1.default.info(NAMESPACE, 'Getting all Request');
    let query = `SELECT  r.id_request, r.initial_date, r.final_date, r.state, u.email,c.brand,c.model,c.price
    FROM request r 
    LEFT JOIN user u
    ON r.created_by = u.id_user
    LEFT JOIN car c
    ON r.rented_car = c.id_car
    `;
    (0, mysql_1.Connect)()
        .then((connection) => {
        (0, mysql_1.Query)(connection, query)
            .then((results) => {
            // logging.info(NAMESPACE, 'Retrieved car: ', results);
            return res.status(200).json(results);
        })
            .catch((error) => {
            logging_1.default.error(NAMESPACE, error.message, error);
            return res.status(500).json({
                message: error.message,
                error
            });
        })
            .finally(() => {
            logging_1.default.info(NAMESPACE, 'Closing connection.');
            connection.end();
        });
    })
        .catch((error) => {
        logging_1.default.error(NAMESPACE, error.message, error);
        return res.status(500).json({
            message: error.message,
            error
        });
    });
});
const createRequest = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    logging_1.default.info(NAMESPACE, 'Inserting request');
    let { initial_date, final_date, created_by, rented_car } = req.body;
    let query = `INSERT INTO request (initial_date,final_date,created_by,rented_car,state) 
    VALUES ("${initial_date}" ,"${final_date}" ,"${created_by}" ,"${rented_car}","req" )`;
    (0, mysql_1.Connect)()
        .then((connection) => {
        (0, mysql_1.Query)(connection, query)
            .then((resultCreated) => __awaiter(void 0, void 0, void 0, function* () {
            logging_1.default.info(NAMESPACE, 'Request created: ', resultCreated);
            let results = JSON.parse(JSON.stringify(resultCreated));
            let paid_request = results.insertId;
            let priceCar = yield getPriceCarById(rented_car)
                .then((priceCar) => {
                let { price } = priceCar;
                return price;
            });
            let days = getDays(initial_date, final_date);
            let amount = days * priceCar;
            let datejs = new Date();
            let today = `${datejs.getFullYear()}-${datejs.getMonth() + 1}-${datejs.getDate()}`;
            let queryPayment = `INSERT INTO payment (amount,paid_date,automatic,paid_request) 
                    VALUES ("${amount}", "${today}" ,"yes" ,"${paid_request}" )`;
            (0, mysql_1.Query)(connection, queryPayment)
                .then((resultPayment) => {
                return res.status(200).json({
                    resultCreated,
                    resultPayment
                });
            })
                .catch((error) => {
                logging_1.default.error(NAMESPACE, error.message, error);
                return res.status(403).json({
                    message: error.message,
                    error
                });
            });
        }))
            .catch((error) => {
            logging_1.default.error(NAMESPACE, error.message, error);
            return res.status(404).json({
                message: error.message,
                error
            });
        })
            .finally(() => {
            logging_1.default.info(NAMESPACE, 'Closing connection.');
            connection.end();
        });
    })
        .catch((error) => {
        logging_1.default.error(NAMESPACE, error.message, error);
        return res.status(500).json({
            message: error.message,
            error
        });
    });
});
const getAllRequestByIdCar = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    logging_1.default.info(NAMESPACE, 'Getting all Request of a car by idCar');
    const { idCar } = req.params;
    let query = `SELECT  r.id_request, r.initial_date, r.final_date, r.state
    FROM request r 
    WHERE (r.rented_car = '${idCar}' ) AND  (r.state = 'req')
    `;
    (0, mysql_1.Connect)()
        .then((connection) => {
        (0, mysql_1.Query)(connection, query)
            .then((results) => {
            // logging.info(NAMESPACE, 'Retrieved car: ', results);
            let result = JSON.parse(JSON.stringify(results));
            let resultFinal = result.map((date) => {
                let [yearI, monthI, dayI] = date.initial_date.split('-');
                dayI = dayI.slice(0, 2);
                let initial = parseInt(dayI, 10) + '-' + parseInt(monthI, 10) + '-' + yearI;
                let [yearF, monthF, dayF] = date.final_date.split('-');
                dayF = dayF.slice(0, 2);
                let final = parseInt(dayF, 10) + '-' + parseInt(monthF, 10) + '-' + yearF;
                return { initial_date: initial, final_date: final, id_request: date.id_request };
            });
            return res.status(200).json(resultFinal);
        })
            .catch((error) => {
            logging_1.default.error(NAMESPACE, error.message, error);
            return res.status(500).json({
                message: error.message,
                error
            });
        })
            .finally(() => {
            logging_1.default.info(NAMESPACE, 'Closing connection.');
            connection.end();
        });
    })
        .catch((error) => {
        logging_1.default.error(NAMESPACE, error.message, error);
        return res.status(500).json({
            message: error.message,
            error
        });
    });
});
const getAllRequestByUserId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    logging_1.default.info(NAMESPACE, 'Getting all Request of a USER by UserId');
    const { userId } = req.params;
    let query = `SELECT  r.id_request, r.initial_date, r.final_date, r.state,c.brand,c.model,c.price,p.amount
    FROM request r 
    LEFT JOIN payment p
    ON r.id_request = p.paid_request  
    LEFT JOIN car c
    ON r.rented_car = c.id_car
    WHERE (r.created_by = '${userId}' ) AND  (r.state = 'req')
    `;
    (0, mysql_1.Connect)()
        .then((connection) => {
        (0, mysql_1.Query)(connection, query)
            .then((results) => {
            // logging.info(NAMESPACE, 'Retrieved car: ', results);
            let result = JSON.parse(JSON.stringify(results));
            let resultFinal = result.map((date) => {
                let [yearI, monthI, dayI] = date.initial_date.split('-');
                dayI = dayI.slice(0, 2);
                let initial = parseInt(dayI, 10) + '-' + parseInt(monthI, 10) + '-' + yearI;
                let [yearF, monthF, dayF] = date.final_date.split('-');
                dayF = dayF.slice(0, 2);
                let final = parseInt(dayF, 10) + '-' + parseInt(monthF, 10) + '-' + yearF;
                return { initial_date: initial, final_date: final, id_request: date.id_request, brand: date.brand, model: date.model, price: date.price, amount: date.amount };
            });
            return res.status(200).json(resultFinal);
        })
            .catch((error) => {
            logging_1.default.error(NAMESPACE, error.message, error);
            return res.status(500).json({
                message: error.message,
                error
            });
        })
            .finally(() => {
            logging_1.default.info(NAMESPACE, 'Closing connection.');
            connection.end();
        });
    })
        .catch((error) => {
        logging_1.default.error(NAMESPACE, error.message, error);
        return res.status(500).json({
            message: error.message,
            error
        });
    });
});
const getPriceCarById = (carId) => __awaiter(void 0, void 0, void 0, function* () {
    logging_1.default.info(NAMESPACE, 'Getting car by car_id');
    let query = `SELECT price  FROM car WHERE id_car = '${carId}'`;
    let result;
    yield (0, mysql_1.Connect)()
        .then((connection) => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, mysql_1.Query)(connection, query)
            .then((results) => {
            // logging.info(NAMESPACE, 'Retrieved car: ', results);
            result = JSON.parse(JSON.stringify(results))[0];
        })
            .catch((error) => {
            logging_1.default.error(NAMESPACE, error.message, error);
            return {
                message: error.message,
                error
            };
        })
            .finally(() => {
            logging_1.default.info(NAMESPACE, 'Closing connection.');
            connection.end();
        });
    }))
        .catch((error) => {
        logging_1.default.error(NAMESPACE, error.message, error);
        return {
            message: error.message,
            error
        };
    });
    return result;
});
const getDays = (f1, f2) => {
    let aFecha1 = f1.split('-');
    let aFecha2 = f2.split('-');
    let fFecha1 = Date.UTC(parseInt(aFecha1[0], 10), parseInt(aFecha1[1], 10) - 1, parseInt(aFecha1[2], 10));
    let fFecha2 = Date.UTC(parseInt(aFecha2[0], 10), parseInt(aFecha2[1], 10) - 1, parseInt(aFecha2[2], 10));
    let dif = fFecha2 - fFecha1;
    let dias = Math.floor(dif / (1000 * 60 * 60 * 24));
    return dias + 1;
};
exports.default = { getAllRequest, createRequest, getAllRequestByIdCar, getAllRequestByUserId };
