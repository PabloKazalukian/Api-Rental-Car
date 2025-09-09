import { UserRouter } from './user.routes';
import { AuthRouter } from './auth.routes';
import { CarRouter } from './car.routes';
import { RequestRouter } from './request.routes';
import { PaymentRouter } from './payment.routes';
import { DiscountRouter } from './discount.routes';
import { EmailRouter } from './email.routes';
import { UserDiscountRouter } from './user-discount.route';

// export abstract class Routes<T, U> {
//     public router: Router;
//     protected controller: T;
//     protected middleware: U;

//     constructor(controller: T, middleware: U) {
//         this.router = Router();
//         this.controller = controller;
//         this.middleware = middleware;
//         this.routes();
//     }

//     protected abstract routes(): void;
// }

export const router = [UserRouter, AuthRouter, CarRouter, RequestRouter, PaymentRouter, DiscountRouter, EmailRouter, UserDiscountRouter];
