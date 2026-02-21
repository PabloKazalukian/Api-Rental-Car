import { Router } from 'express';
import { MiddlewareFactory } from '../../../../application/factories/middleware.factory';
import { cartController } from '../controllers/index.controller';

const router = Router();
const cartMiddleware = MiddlewareFactory.createCartMiddleware();

router.get('/cart/:idUser', (req, res) => {
    cartController.getCartById(req, res);
});

router.post('/cart', cartMiddleware.passAuth('jwt'), cartMiddleware.cartValidator.bind(cartMiddleware), (req, res) => {
    cartController.createCart(req, res);
});

router.put('/cart/:idUser', cartMiddleware.passAuth('jwt'), cartMiddleware.cartValidator.bind(cartMiddleware), (req, res) => {
    cartController.updateCart(req, res);
});

export const CartRouter = router;
