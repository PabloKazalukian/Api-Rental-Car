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
exports.checkRole = void 0;
const AuthController_1 = __importDefault(require("../controllers/AuthController"));
const checkRole = (roleA) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { userId } = res.locals.jwtpayload;
        try {
            let result = yield AuthController_1.default.getUserById(userId);
            const { role } = result[0];
            if (roleA.includes(role)) {
                next();
            }
            else {
                return res.status(401).send('no Autorizado');
            }
        }
        catch (e) {
            return res.status(401).send('no Autorizado');
        }
    });
};
exports.checkRole = checkRole;
