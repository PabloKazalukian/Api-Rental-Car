import { Router, Request, Response } from 'express';
import { Container } from '../../../di/container';
import { IPaymentController } from '../../../../domain/interface/controllers/payment-controller.interface';

const router = Router();

const resolveHandler = <K extends keyof IPaymentController>(controllerName: string, methodName: K) => {
    return async (req: Request, res: Response) => {
        const controller = Container.resolve<IPaymentController>(controllerName);
        await controller[methodName](req, res);
    };
};

router.get('/payment', resolveHandler('IPaymentController', 'getAllPayment'));
router.get('/payment/:id', resolveHandler('IPaymentController', 'getPaymentById'));
router.post('/payment/create', resolveHandler('IPaymentController', 'createPayment'));

export const PaymentRouter = router;
