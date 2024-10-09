// import { CarController } from "../controllers/car.controller";
import { RequestController } from "../controllers/request.controller";
import { Routes } from "./routes";


export class RequestRouter extends Routes<RequestController> {
    constructor() {
        super(RequestController)
    }

    routes(): void {
        this.router.get('/request', (req, res) => { this.controller.getAllRequest(req, res) });
        this.router.post('/request', (req, res) => { this.controller.createRequest(req, res); });
        this.router.get('/request/:id', (req, res) => { this.controller.getRequestById(req, res); });
    }
}