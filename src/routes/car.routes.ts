import { CarController } from "../controllers/car.controller";
import { CarMiddleware } from "../middlewares/car.middleware";
import { Routes } from "./routes";


export class CarRouter extends Routes<CarController, CarMiddleware> {
    constructor() {
        super(CarController, CarMiddleware)
    }

    routes(): void {
        this.router.get('/car', (req, res) => { this.controller.getAllCar(req, res) });
        this.router.post('/car', (req, res, next) => [this.middleware.carValidator(req, res, next)], (req, res) => { this.controller.createCar(req, res); });
        this.router.get('/car/:id', (req, res) => { this.controller.getCarById(req, res); });
        this.router.get('/car/price/:id', (req, res) => { this.controller.getPriceById(req, res); });
    }
}
