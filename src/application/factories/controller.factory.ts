import { CartRepository } from '../../infrastructure/gateways/repositories/cart.repository';
import { CartController } from '../../infrastructure/interfaces/http/controllers/cart.controller';
import { IAuthController } from '../../domain/interface/controllers/auth-controller.interface';
import { IDiscountController } from '../../domain/interface/controllers/discount-controller.interface';
import { IUserDiscountController } from '../../domain/interface/controllers/user-controller.interface';
import { AuthService } from '../../infrastructure/gateways/repositories/auth.service';
import { CarRepository } from '../../infrastructure/gateways/repositories/car.repository';
import { DiscountRepository } from '../../infrastructure/gateways/repositories/discount.repository';
import { PaymentRepository } from '../../infrastructure/gateways/repositories/payment.repository';
import { RequestRepository } from '../../infrastructure/gateways/repositories/request.repository';
import { UserDiscountRepository } from '../../infrastructure/gateways/repositories/user-discount.repository';
import { UserRepository } from '../../infrastructure/gateways/repositories/user.repository';
import { HttpResponseSingleton } from '../../infrastructure/gateways/response/http-singleton.response';
import { AuthController } from '../../infrastructure/interfaces/http/controllers/auth.controller';
import { DiscountController } from '../../infrastructure/interfaces/http/controllers/discount.controller';
import { PaymentController } from '../../infrastructure/interfaces/http/controllers/payment.controller';
import { RequestController } from '../../infrastructure/interfaces/http/controllers/request.controller';
import { UserDiscountController } from '../../infrastructure/interfaces/http/controllers/user-discount.controller';
import { GoogleLoginUseCase } from '../use-case/auth/google-login.use-case';
import { LoginUseCase } from '../use-case/auth/login.use-case';
import { RefreshTokenUseCase } from '../use-case/auth/refresh-token.use-case';
import { CreateDiscountUseCase } from '../use-case/discount/create-discount.use-case';
import { CreatePaymentUseCase } from '../use-case/payment/payment.use-case';
import { CreateUserDiscountUseCase } from '../use-case/user-discount/create.user-case';

export class ControllerFactory {
    static createCartController() {
        const cartRepo = new CartRepository();
        const httpResponse = HttpResponseSingleton.getInstance();
        return new CartController(cartRepo, httpResponse);
    }
    static createAuthController(): IAuthController {
        const userRepo = new UserRepository();
        const authService = new AuthService(userRepo);
        const loginUseCase = new LoginUseCase(authService);
        const googleLoginUseCase = new GoogleLoginUseCase(userRepo);
        const refreshTokenUseCase = new RefreshTokenUseCase(userRepo);
        const httpResponse = HttpResponseSingleton.getInstance();
        return new AuthController(loginUseCase, googleLoginUseCase, refreshTokenUseCase, httpResponse);
    }

    static createDiscountController(): IDiscountController {
        const discountRepo = new DiscountRepository();
        const createDiscountUseCase = new CreateDiscountUseCase(discountRepo);
        const httpResponse = HttpResponseSingleton.getInstance();
        return new DiscountController(createDiscountUseCase, discountRepo, httpResponse);
    }

    static createUserDiscountController(): IUserDiscountController {
        const userRepo = new UserRepository();
        const discountRepo = new DiscountRepository();
        const userDiscountRepo = new UserDiscountRepository();
        const createUserDiscountUseCase = new CreateUserDiscountUseCase(userDiscountRepo, userRepo, discountRepo);
        const httpResponse = HttpResponseSingleton.getInstance();
        return new UserDiscountController(createUserDiscountUseCase, userDiscountRepo, httpResponse);
    }

    static createPaymentController() {
        const createPaymentUseCase = new CreatePaymentUseCase();
        const httpResponse = HttpResponseSingleton.getInstance();
        const paymentRepo = new PaymentRepository();

        return new PaymentController(createPaymentUseCase, paymentRepo, httpResponse);
    }

    static createRequestController() {
        const requestRepo = new RequestRepository();
        const carSvc = new CarRepository();
        const httpResponse = HttpResponseSingleton.getInstance();

        return new RequestController(requestRepo, carSvc, httpResponse);
    }
}
