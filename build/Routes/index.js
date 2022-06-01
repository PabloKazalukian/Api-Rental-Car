"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const car_1 = __importDefault(require("./car"));
const user_1 = __importDefault(require("./user"));
const auth_1 = __importDefault(require("./auth"));
const request_1 = __importDefault(require("./request"));
const router = express_1.default.Router();
// router.post('/create/book', controller.createBook);
router.use('/car', car_1.default);
router.use('/user', user_1.default);
router.use('/auth', auth_1.default);
router.use('/request', request_1.default);
module.exports = router;
