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
exports.checkJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const checkJwt = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers['auth'];
    let jwtpayload;
    try {
        jwtpayload = jsonwebtoken_1.default.verify(token, config_1.default.auth.key);
        res.locals.jwtpayload = jwtpayload;
    }
    catch (e) {
        return res.status(401).send('error Token');
    }
    const { userId, username } = jwtpayload;
    const newToken = jsonwebtoken_1.default.sign({ userId, username }, config_1.default.auth.key, { expiresIn: config_1.default.auth.expires });
    res.setHeader('token', newToken);
    //call Next
    next();
});
exports.checkJwt = checkJwt;