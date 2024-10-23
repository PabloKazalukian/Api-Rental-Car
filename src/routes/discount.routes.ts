import { Routes } from "./routes";
import { DiscountController } from "../controllers/discount.controller";
import { DiscountMiddleware } from "../middlewares/discount.middleware";


export class DiscountRouter extends Routes<DiscountController, DiscountMiddleware> {
    constructor() {
        super(DiscountController, DiscountMiddleware)
    }

    routes(): void {
        this.router.post('/discount', (req, res, next) => [this.middleware.discountValidator(req, res, next)], (req, res) => { this.controller.createDiscount(req, res); });
        this.router.get('/discount', (req, res) => { this.controller.getAllDiscount(req, res); });
        this.router.get('/discount/:id', (req, res) => { this.controller.getDiscountById(req, res); });

    }
}