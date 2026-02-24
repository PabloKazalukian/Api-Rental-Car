import { UserRouter } from './user.routes';
import { AuthRouter } from './auth.routes';
import { CarRouter } from './car.routes';
import { RequestRouter } from './request.routes';
import { PaymentRouter } from './payment.routes';
import { DiscountRouter } from './discount.routes';
import { EmailRouter } from './email.routes';
import { UserDiscountRouter } from './user-discount.route';
import { CartRouter } from './cart.route';

export const router = [
    UserRouter,
    AuthRouter,
    CarRouter,
    RequestRouter,
    PaymentRouter,
    DiscountRouter,
    EmailRouter,
    UserDiscountRouter,
    CartRouter
];
