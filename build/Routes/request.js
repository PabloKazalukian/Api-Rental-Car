"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const requestController_1 = __importDefault(require("../controllers/requestController"));
const jwt_1 = require("../middlewares/jwt");
const role_1 = require("../middlewares/role");
const router = express_1.default.Router();
router.get('/all', [jwt_1.checkJwt], [(0, role_1.checkRole)(['admin'])], requestController_1.default.getAllRequest);
router.get('/allOfCarId/:idCar', [jwt_1.checkJwt], requestController_1.default.getAllRequestByIdCar);
router.post('/', [jwt_1.checkJwt], requestController_1.default.createRequest);
module.exports = router;
