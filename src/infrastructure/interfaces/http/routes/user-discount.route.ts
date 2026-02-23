import { Router } from 'express';
import { MiddlewareFactory } from '../../../../application/factories/middleware.factory';
import { Container } from '../../../di/container';
import { Request, Response } from 'express';
import { IUserDiscountController } from '../../../../domain/interface/controllers/userDiscount-controller.interface';
    
const resolveHandler = <K extends keyof IUserDiscountController>(controllerName: string, methodName: K) => {
    return async (req: Request, res: Response) => {
        const controller = Container.resolve<IUserDiscountController>(controllerName);
        await controller[methodName](req, res);
    };
};


const router = Router();
const userDiscountMiddleware = MiddlewareFactory.createUserDiscountMiddleware();

router.get('/user-discount', userDiscountMiddleware.passAuth('jwt', { session: false }), resolveHandler('IUserDiscountController', 'getAllUserDiscount'));
router.get('/user-discount/:id', userDiscountMiddleware.passAuth('jwt', { session: false }), resolveHandler('IUserDiscountController', 'getUserDiscountById'));
router.post('/user-discount/', userDiscountMiddleware.discountCreateValidator.bind(userDiscountMiddleware), resolveHandler('IUserDiscountController', 'createUserDiscount'));
router.put('/user-discount/payment', userDiscountMiddleware.discountConfirmValidator.bind(userDiscountMiddleware), resolveHandler('IUserDiscountController', 'paymentUserDiscount'));

export const UserDiscountRouter = router;
