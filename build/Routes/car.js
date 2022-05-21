"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const carController_1 = __importDefault(require("../controllers/carController"));
const router = express_1.default.Router();
router.get('/', carController_1.default.getAllCars);
router.post('/', carController_1.default.createCar);
module.exports = router;
