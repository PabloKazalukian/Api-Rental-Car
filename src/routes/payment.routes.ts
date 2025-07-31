// import { UserController } from "../controllers/user.controller";
import { Router } from "express";
import { PaymentMiddleware } from "../middlewares/payment.middleware";
import { paymentController } from "../controllers/index.controller";


const middleware = new PaymentMiddleware();
const router = Router();

router.get('/payment', (req, res) => { paymentController.getAllPayment(req, res) });
router.get('/payment/:id', (req, res) => { paymentController.getPaymentById(req, res) });
router.post('/payment', (req, res, next) => [middleware.paymentValidator(req, res, next)], (req, res) => { paymentController.createPayment(req, res); });
// router.get('/login', (req, res) => { paymentController.login(req, res); });

export const PaymentRouter = router;