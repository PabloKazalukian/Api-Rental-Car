import { Router } from "express";
import { carController } from "../controllers/index.controller";
import { MiddlewareFactory } from "../../../../application/factories/middleware.factory";

const router = Router();
const carMiddleware = MiddlewareFactory.createCarMiddleware();


router.get('/car', (req, res) => { carController.getAllCar(req, res) });
router.get('/car/:id', (req, res) => { carController.getCarById(req, res); });
router.get('/car/price/:id', (req, res) => { carController.getPriceById(req, res); });
router.post('/car', carMiddleware.checkAdminRole.bind(carMiddleware), carMiddleware.carValidator.bind(carMiddleware), (req, res) => { carController.createCar(req, res); });

export const CarRouter = router;
