import { Router, Request, Response } from 'express';
import { Container } from '../../../di/container';
import { IDiscountController } from '../../../../domain/interface/controllers/discount-controller.interface';
import { MiddlewareFactory } from '../../../../application/factories/middleware.factory';

const router = Router();

// const discountController = Container.resolve<IDiscountController>('IDiscountController');

// const discountMiddleware = Container.resolve<IDiscountController>('IDiscountController');}
const discountMiddleware = MiddlewareFactory.createDiscountMiddleware();

const resolveHandler = <K extends keyof IDiscountController>(controllerName: string, methodName: K) => {
    return async (req: Request, res: Response) => {
        const controller = Container.resolve<IDiscountController>(controllerName);
        await controller[methodName](req, res);
    };
};

// router.get('/discount', discountMiddleware.passAuth('jwt', { session: false }), (req, res) => {
// discountController.getAllDiscount(req, res);
// });
// router.get('/discount/:id', discountMiddleware.passAuth('jwt', { session: false }), (req, res) => {
// discountController.getDiscountById(req, res);
// });
// router.post(
// '/discount',
// discountMiddleware.passAuth('jwt', { session: false }),
// discountMiddleware.checkAdminRole.bind(discountController),
// discountMiddleware.discountValidator.bind(discountMiddleware),
// (req, res) => {
// discountController.createDiscount(req, res);
// }
// );
router.get('/discount', resolveHandler('IDiscountController', 'getAllDiscount'));
router.get(
    '/discount/:id',
    // discountMiddleware.checkAdminRole.bind(discountController),
    discountMiddleware.discountValidator.bind(discountMiddleware),
    resolveHandler('IDiscountController', 'getDiscountById')
);
router.post('/discount/create', resolveHandler('IDiscountController', 'createDiscount'));

export const DiscountRouter = router;
