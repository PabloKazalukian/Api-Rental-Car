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
const NAMESPACE = 'Auth';
const findUserByEmail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    logging_1.default.info(NAMESPACE, 'Getting user by email');
    let { email } = req.body;
    if (email !== undefined) {
        let query = `SELECT username,password,email,role FROM user WHERE email = '${email}'`;
        (0, mysql_1.Connect)()
            .then((connection) => {
            (0, mysql_1.Query)(connection, query)
                .then((results) => {
                // logging.info(NAMESPACE, 'Retrieved car: ', results);
                if (results.length > 0) {
                    return res.status(200).json(results);
                }
                else {
                    throw new TypeError('no econtrado');
                }
            })
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
            return res.status(200).json({
                message: error.message,
                error
            });
        });
    }
    else {
        return res.status(404).json({
            message: 'no encontrado'
        });
    }
});
exports.default = { findUserByEmail };
