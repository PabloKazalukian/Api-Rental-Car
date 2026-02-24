import { Router, Request, Response } from 'express';
import { Container } from '../../../di/container';
import { IJwtMiddleware } from '../../../../domain/interface/middlewares/jwt-middleware.interface';
import { ICartController } from '../../../../domain/interface/controllers/cart-controller.interface';
import { ICartMiddleware } from '../../../../domain/interface/middlewares/cart-middleware.interface';

const router = Router();

const jwtMiddleware = Container.resolve<IJwtMiddleware>('IJwtMiddleware');
const cartMiddleware = Container.resolve<ICartMiddleware>('ICartMiddleware');

const resolveHandler = <K extends keyof ICartController>(controllerName: string, methodName: K) => {
    return async (req: Request, res: Response) => {
        const controller = Container.resolve<ICartController>(controllerName);
        await controller[methodName](req, res);
    };
};

router.get('/cart/:idUser', resolveHandler('ICartController', 'getCartById'));

router.post('/cart', jwtMiddleware.passAuth('jwt'), cartMiddleware.cartValidator, resolveHandler('ICartController', 'createCart'));

router.put('/cart/:idUser', jwtMiddleware.passAuth('jwt'), cartMiddleware.cartValidator, resolveHandler('ICartController', 'updateCart'));

export const CartRouter = router;
