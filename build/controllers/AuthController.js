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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const NAMESPACE = 'Auth';
const findUserLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    logging_1.default.info(NAMESPACE, 'Getting user by email');
    let { email, password } = req.body;
    if (email !== undefined && password !== undefined) {
        let query = `SELECT username,password,email,role,id_user FROM user WHERE email = '${email}'`;
        (0, mysql_1.Connect)()
            .then((connection) => {
            (0, mysql_1.Query)(connection, query)
                .then((results) => {
                // logging.info(NAMESPACE, 'Retrieved car: ', results);
                if (results.length > 0) {
                    let [user] = results;
                    if (bcryptjs_1.default.compareSync(password, user.password)) {
                        let token = jsonwebtoken_1.default.sign({ userId: user.id_user, username: user.username }, config_1.default.auth.key, { expiresIn: config_1.default.auth.expires });
                        return res.status(200).json({ message: 'ok', token });
                    }
                    else {
                        throw new TypeError('no encontrado');
                    }
                }
                else {
                    throw new TypeError('no encontrado');
                }
            })
                .catch((error) => {
                logging_1.default.error(NAMESPACE, error.message, error);
                return res.status(400).json({
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
    }
    else {
        return res.status(404).json({
            message: 'Error: Faltan datos '
        });
    }
});
const getUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    logging_1.default.info(NAMESPACE, 'Getting user by user_id');
    let query = `SELECT role  FROM user WHERE id_user = '${userId}'`;
    let result;
    yield (0, mysql_1.Connect)()
        .then((connection) => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, mysql_1.Query)(connection, query)
            .then((results) => {
            // logging.info(NAMESPACE, 'Retrieved car: ', results);
            result = JSON.parse(JSON.stringify(results));
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
exports.default = { findUserLogin, getUserById };
