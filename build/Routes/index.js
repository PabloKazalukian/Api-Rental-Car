"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const carController_1 = __importDefault(require("../controllers/carController"));
const router = express_1.default.Router();
// router.post('/create/book', controller.createBook);
router.get('/car', carController_1.default.getAllCars);
module.exports = router;
