import { Router } from 'express';
import { Container } from '../../../di/container';
import { Request, Response } from 'express';
import { IUserDiscountController } from '../../../../domain/interface/controllers/userDiscount-controller.interface';
import { IJwtMiddleware } from '../../../../domain/interface/middlewares/jwt-middleware.interface';
import { IUserDiscountMiddleware } from '../../../../domain/interface/middlewares/user-discount-middleware.interface';

const jwtMiddleware = Container.resolve<IJwtMiddleware>('IJwtMiddleware');

const resolveHandler = <K extends keyof IUserDiscountController>(controllerName: string, methodName: K) => {
    return async (req: Request, res: Response) => {
        const controller = Container.resolve<IUserDiscountController>(controllerName);
        await controller[methodName](req, res);
    };
};

const router = Router();
const userDiscountMiddleware = Container.resolve<IUserDiscountMiddleware>('IUserDiscountMiddleware');

router.get(
    '/user-discount',
    jwtMiddleware.passAuth('jwt', { session: false }),
    resolveHandler('IUserDiscountController', 'getAllUserDiscount')
);
router.get(
    '/user-discount/:id',
    jwtMiddleware.passAuth('jwt', { session: false }),
    resolveHandler('IUserDiscountController', 'getUserDiscountById')
);
router.post(
    '/user-discount/',
    userDiscountMiddleware.discountCreateValidator,
    resolveHandler('IUserDiscountController', 'createUserDiscount')
);
router.put(
    '/user-discount/payment',
    userDiscountMiddleware.discountConfirmValidator,
    resolveHandler('IUserDiscountController', 'paymentUserDiscount')
);

export const UserDiscountRouter = router;
