"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const carController_1 = __importDefault(require("../controllers/carController"));
const jwt_1 = require("../middlewares/jwt");
const role_1 = require("../middlewares/role");
const router = express_1.default.Router();
// router.get('/', controller.getAllCars);
router.get('/', carController_1.default.getAllCars);
router.post('/', [jwt_1.checkJwt], [(0, role_1.checkRole)(['admin'])], carController_1.default.createCar);
module.exports = router;
