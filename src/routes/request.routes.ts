// import { CarController } from "../controllers/car.controller";
import { RequestController } from "../controllers/request.controller";
import { RequestMiddleware } from "../middlewares/request.middleware";
import { Routes } from "./routes";


export class RequestRouter extends Routes<RequestController, RequestMiddleware> {
    constructor() {
        super(RequestController, RequestMiddleware);
    }
    routes(): void {
        this.router.get('/request', (req, res) => { this.controller.getAllRequest(req, res) });
        this.router.post('/request', (req, res, next) => [this.middleware.requestValidator(req, res, next)], (req, res) => { this.controller.createRequest(req, res); });
        this.router.get('/request/:id', (req, res) => { this.controller.getRequestById(req, res); });
        this.router.get('/request/allOfUserId/:user_id', (req, res) => { this.controller.getRequestByUser(req, res); });
        this.router.get('/request/allOfCarId/:car_id', (req, res) => { this.controller.getRequestBycar(req, res); });
    }
}