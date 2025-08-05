// import { UserController } from "../controllers/user.controller";
import { Router } from "express";
import { paymentController } from "../controllers/index.controller";
import { paymentMiddleware } from "../middlewares/index.middleware";


const router = Router();

router.get('/payment', (req, res) => { paymentController.getAllPayment(req, res) });
router.get('/payment/:id', (req, res) => { paymentController.getPaymentById(req, res) });
router.post('/payment', paymentMiddleware.paymentValidator.bind(paymentMiddleware), (req, res) => { paymentController.createPayment(req, res); });
// router.get('/login', (req, res) => { paymentController.login(req, res); });

export const PaymentRouter = router;