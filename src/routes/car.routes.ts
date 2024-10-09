import { CarController } from "../controllers/car.controller";
import { Routes } from "./routes";


export class CarRouter extends Routes<CarController> {
    constructor() {
        super(CarController)
    }

    routes(): void {
        this.router.get('/car', (req, res) => { this.controller.getAllCar(req, res) });
        this.router.post('/car', (req, res) => { this.controller.createCar(req, res); });
        this.router.get('/car/:id', (req, res) => { this.controller.getCarById(req, res); });
        this.router.get('/car/price/:id', (req, res) => { this.controller.getPriceById(req, res); });
    }
}
