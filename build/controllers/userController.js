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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const NAMESPACE = 'User';
const getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    logging_1.default.info(NAMESPACE, 'Getting all user');
    let query = 'SELECT username,email,role,password  FROM user';
    (0, mysql_1.Connect)()
        .then((connection) => {
        (0, mysql_1.Query)(connection, query)
            .then((results) => {
            // logging.info(NAMESPACE, 'Retrieved car: ', results);
            return res.status(200).json(results);
        })
            .catch((error) => {
            logging_1.default.error(NAMESPACE, error.message, error);
            return res.status(200).json({
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
        return res.status(200).json({
            message: error.message,
            error
        });
    });
});
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    logging_1.default.info(NAMESPACE, 'Inserting user');
    let { username, password, email } = req.body;
    const salt = bcryptjs_1.default.genSaltSync(8);
    password = bcryptjs_1.default.hashSync(password, salt);
    let query = `INSERT INTO user (username,password,email,role) 
    VALUES ("${username}", "${password}", "${email}","user")`;
    (0, mysql_1.Connect)()
        .then((connection) => {
        (0, mysql_1.Query)(connection, query)
            .then((result) => {
            logging_1.default.info(NAMESPACE, 'User created: ', result);
            return res.status(200).json({
                result
            });
        })
            .catch((error) => {
            logging_1.default.error(NAMESPACE, error.message, error);
            return res.status(200).json({
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
        return res.status(200).json({
            message: error.message,
            error
        });
    });
});
exports.default = { createUser, getAllUsers };
