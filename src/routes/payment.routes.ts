// import { UserController } from "../controllers/user.controller";
import { PaymentController } from "../controllers/payment.controller";
import { Routes } from "./routes";


export class PaymentRouter extends Routes<PaymentController> {
    constructor() {
        super(PaymentController)
    }

    routes(): void {
        this.router.get('/payment', (req, res) => { this.controller.getAllPayment(req, res) });
        this.router.get('/payment/:id', (req, res) => { this.controller.getPaymentById(req, res) });
        this.router.post('/payment', (req, res) => { this.controller.createPayment(req, res); });
        // this.router.get('/login', (req, res) => { this.controller.login(req, res); });
    }
}