import { Router } from 'express';
import { MiddlewareFactory } from '../../../../application/factories/middleware.factory';
import { cartController } from '../controllers/index.controller';

const router = Router();
const cartMiddleware = MiddlewareFactory.createCartMiddleware();

router.get('/cart', (req, res) => {
    cartController.getAllCart(req, res);
});

router.get('/cart/:id', (req, res) => {
    cartController.getCartById(req, res);
});

router.post(
    '/cart',
    cartMiddleware.cartValidator.bind(cartMiddleware),
    (req, res) => {
        cartController.createCart(req, res);
    }
);

export const CartRouter = router;
