import { Router } from "express";
import { paymentController } from "../controllers/index.controller";
import { MiddlewareFactory } from "../../../../application/factories/middleware.factory";


const router = Router();
const paymentMiddleware = MiddlewareFactory.createpaymentMiddleware();

router.get('/payment', (req, res) => { paymentController.getAllPayment(req, res) });
router.get('/payment/:id', (req, res) => { paymentController.getPaymentById(req, res) });
router.post('/payment', paymentMiddleware.paymentValidator.bind(paymentMiddleware), (req, res) => { paymentController.createPayment(req, res); });

export const PaymentRouter = router;