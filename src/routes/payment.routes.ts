// import { UserController } from "../controllers/user.controller";
import { PaymentController } from "../controllers/payment.controller";
import { PaymentMiddleware } from "../middlewares/payment.middleware";
import { Routes } from "./routes";


export class PaymentRouter extends Routes<PaymentController, PaymentMiddleware> {
    constructor() {
        super(PaymentController, PaymentMiddleware);
    }

    routes(): void {
        this.router.get('/payment', (req, res) => { this.controller.getAllPayment(req, res) });
        this.router.get('/payment/:id', (req, res) => { this.controller.getPaymentById(req, res) });
        this.router.post('/payment', (req, res, next) => [this.middleware.paymentValidator(req, res, next)], (req, res) => { this.controller.createPayment(req, res); });
        // this.router.get('/login', (req, res) => { this.controller.login(req, res); });
    }
}