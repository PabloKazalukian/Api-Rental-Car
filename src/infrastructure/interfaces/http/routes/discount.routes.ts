import { Router, Request, Response } from 'express';
import { Container } from '../../../di/container';
import { IDiscountController } from '../../../../domain/interface/controllers/discount-controller.interface';
import { IDiscountMiddleware } from '../../../../domain/interface/middlewares/discount-middleware.interface';

const router = Router();

const discountMiddleware = Container.resolve<IDiscountMiddleware>('IDiscountMiddleware');

const resolveHandler = <K extends keyof IDiscountController>(controllerName: string, methodName: K) => {
    return async (req: Request, res: Response) => {
        const controller = Container.resolve<IDiscountController>(controllerName);
        await controller[methodName](req, res);
    };
};

router.get('/discount', resolveHandler('IDiscountController', 'getAllDiscount'));
router.get('/discount/:id', discountMiddleware.discountValidator, resolveHandler('IDiscountController', 'getDiscountById'));
router.post('/discount/create', discountMiddleware.discountValidator, resolveHandler('IDiscountController', 'createDiscount'));

export const DiscountRouter = router;
