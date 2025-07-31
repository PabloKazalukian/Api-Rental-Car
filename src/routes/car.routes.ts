import { Router } from "express";
import { CarMiddleware } from "../middlewares/car.middleware";
import { carController } from "../controllers/index.controller";

const router = Router();
const middleware = new CarMiddleware();

router.get('/car', (req, res) => { carController.getAllCar(req, res) });
router.get('/car/:id', (req, res) => { carController.getCarById(req, res); });
router.get('/car/price/:id', (req, res) => { carController.getPriceById(req, res); });
router.post('/car', (req, res, next) => [middleware.carValidator(req, res, next)], (req, res) => { carController.createCar(req, res); });

export const CarRouter = router;
