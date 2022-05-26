"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../controllers/userController"));
const jwt_1 = require("../middlewares/jwt");
const router = express_1.default.Router();
router.get('/', [jwt_1.checkJwt], userController_1.default.getAllUsers);
router.post('/', userController_1.default.createUser);
module.exports = router;
