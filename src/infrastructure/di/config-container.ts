// infrastructure/di/container-config.ts
import { ICarController } from '../../domain/interface/controllers/car-controller.interface';
import { IUserController } from '../../domain/interface/controllers/user-controller.interface';
import { IAuthController } from '../../domain/interface/controllers/auth-controller.interface';
import { IDiscountController } from '../../domain/interface/controllers/discount-controller.interface';
import { IUserDiscountController } from '../../domain/interface/controllers/userDiscount-controller.interface';
// import { IPaymentController } from '../../domain/interface/controllers/payment-controller.interface';
import { IRequestController } from '../../domain/interface/controllers/request-controller.interface';
import { ICartController } from '../../domain/interface/controllers/cart-controller.interface';
import { IEmailController } from '../../domain/interface/controllers/email-controller.interface';

import { IAuthService } from '../../domain/interface/repositories/auth.interface';
import { ICarRepository } from '../../domain/interface/repositories/car-repository.interface';
import { IUserRepository } from '../../domain/interface/repositories/userRepository.interface';
import { IDiscountRepository } from '../../domain/interface/repositories/discount-repository.interface';
import { IPaymentRepository } from '../../domain/interface/repositories/payment-repository.interface';
import { IRequestRepository } from '../../domain/interface/repositories/request-repository.interface';
import { ICartRepository } from '../../domain/interface/repositories/cart-repository.interface';
import { IUserDiscountRepository } from '../../domain/interface/repositories/user-discount-repository.interface';
import { IEmailProvider, IEmailRepository } from '../gateways/email/IEamilProvider';

import { AuthService } from '../gateways/repositories/auth.service';
import { CarRepository } from '../gateways/repositories/car.repository';
import { UserRepository } from '../gateways/repositories/user.repository';
import { DiscountRepository } from '../gateways/repositories/discount.repository';
import { PaymentRepository } from '../gateways/repositories/payment.repository';
import { RequestRepository } from '../gateways/repositories/request.repository';
import { CartRepository } from '../gateways/repositories/cart.repository';
import { UserDiscountRepository } from '../gateways/repositories/user-discount.repository';
import { EmailRepository } from '../gateways/repositories/email.repository';
import { ResendEmailProvider } from '../gateways/email/resend.provider';

import { IHttpResponse } from '../gateways/response/http-singleton.response';
import { HttpResponse } from '../gateways/response/http.response';

import { UserController } from '../interfaces/http/controllers/user.controller';
import { CarController } from '../interfaces/http/controllers/car.controller';
import { AuthController } from '../interfaces/http/controllers/auth.controller';
import { DiscountController } from '../interfaces/http/controllers/discount.controller';
import { UserDiscountController } from '../interfaces/http/controllers/user-discount.controller';
import { PaymentController } from '../interfaces/http/controllers/payment.controller';
import { RequestController } from '../interfaces/http/controllers/request.controller';
import { CartController } from '../interfaces/http/controllers/cart.controller';
import { EmailController } from '../interfaces/http/controllers/email.controller';

import { LoginUseCase } from '../../application/use-case/auth/login.use-case';
import { GoogleLoginUseCase } from '../../application/use-case/auth/google-login.use-case';
import { RefreshTokenUseCase } from '../../application/use-case/auth/refresh-token.use-case';
import { CreateDiscountUseCase } from '../../application/use-case/discount/create-discount.use-case';
import { CreatePaymentUseCase } from '../../application/use-case/payment/payment.use-case';
import { CreateUserDiscountUseCase } from '../../application/use-case/user-discount/create.user-case';

import { Container } from './container';
import { UserMiddleware } from '../../application/middlewares/user.middleware';
import { IUserMiddleware } from '../../domain/interface/middlewares/user-middleware.interface';
import { IJwtMiddleware } from '../../domain/interface/middlewares/jwt-middleware.interface';
import { JwtMiddleware } from '../../application/middlewares/jwt.middleware';
import { IRequestMiddleware } from '../../domain/interface/middlewares/request-middleware.interface';
import { RequestMiddleware } from '../../application/middlewares/request.middleware';
import { ICarMiddleware } from '../../domain/interface/middlewares/car-middleware.interface';
import { ICartMiddleware } from '../../domain/interface/middlewares/cart-middleware.interface';
import { CarMiddleware } from '../../application/middlewares/car.middleware';
import { CartMiddleware } from '../../application/middlewares/cart.middleware';
import { IUserDiscountMiddleware } from '../../domain/interface/middlewares/user-discount-middleware.interface';
import { UserDiscountMiddleware } from '../../application/middlewares/user-discount.middleware';
import { IPaymentMiddleware } from '../../domain/interface/middlewares/payment-middleware.interface';
import { PaymentMiddleware } from '../../application/middlewares/payment.middleware';
import { IDiscountMiddleware } from '../../domain/interface/middlewares/discount-middleware.interface';
import { DiscountMiddleware } from '../../application/middlewares/discount.middleware';
import { IEmailMiddleware } from '../../domain/interface/middlewares/email-middleware.interface';
import { EmailMiddleware } from '../../application/middlewares/email.middleware';

export function configureContainer() {
    // ===== UTILS =====
    Container.registerSingleton<IHttpResponse>('IHttpResponse', HttpResponse);
    const httpResponse = Container.resolve<IHttpResponse>('IHttpResponse');

    // ===== REPOSITORIOS =====
    Container.registerSingleton<IUserRepository>('IUserRepository', UserRepository);
    Container.registerSingleton<ICarRepository>('ICarRepository', CarRepository);
    Container.registerSingleton<IDiscountRepository>('IDiscountRepository', DiscountRepository);
    Container.registerSingleton<IPaymentRepository>('IPaymentRepository', PaymentRepository);
    Container.registerSingleton<IRequestRepository>('IRequestRepository', RequestRepository);
    Container.registerSingleton<ICartRepository>('ICartRepository', CartRepository);
    Container.registerSingleton<IUserDiscountRepository>('IUserDiscountRepository', UserDiscountRepository);
    Container.registerSingleton<IUserRepository>('IUserRepository', UserRepository);

    // ==== MIDDLEWARES =====
    Container.registerFactory<ICarMiddleware>('ICarMiddleware', () => {
        return new CarMiddleware(httpResponse);
    });
    Container.registerSingleton<ICartMiddleware>('ICartMiddleware', CartMiddleware);
    Container.registerSingleton<IDiscountMiddleware>('IDiscountMiddleware', DiscountMiddleware);
    Container.registerSingleton<IEmailMiddleware>('IEmailMiddleware', EmailMiddleware);
    Container.registerSingleton<IJwtMiddleware>('IJwtMiddleware', JwtMiddleware);
    Container.registerSingleton<IPaymentMiddleware>('IPaymentMiddleware', PaymentMiddleware);
    Container.registerSingleton<IRequestMiddleware>('IRequestMiddleware', RequestMiddleware);
    Container.registerSingleton<IUserMiddleware>('IUserMiddleware', UserMiddleware);
    Container.registerSingleton<IUserDiscountMiddleware>('IUserDiscountMiddleware', UserDiscountMiddleware);

    // ===== SERVICIOS =====
    Container.registerSingleton<IAuthService>('IAuthService', AuthService);
    Container.register<IEmailProvider>('IEmailProvider', ResendEmailProvider);
    Container.registerSingleton<IEmailRepository>('IEmailRepository', EmailRepository);

    //===== CONTROLLERS =====
    Container.registerFactory<IAuthController>('IAuthController', () => {
        const loginUseCase = Container.resolve<LoginUseCase>('LoginUseCase');
        const googleLoginUseCase = Container.resolve<GoogleLoginUseCase>('GoogleLoginUseCase');
        const refreshTokenUseCase = Container.resolve<RefreshTokenUseCase>('RefreshTokenUseCase');
        return new AuthController(loginUseCase, googleLoginUseCase, refreshTokenUseCase, httpResponse);
    });

    Container.registerFactory<IUserController>('IUserController', () => {
        const userRepository = Container.resolve<IUserRepository>('IUserRepository');
        return new UserController(userRepository, httpResponse);
    });

    Container.registerFactory<ICarController>('ICarController', () => {
        const carRepository = Container.resolve<ICarRepository>('ICarRepository');
        return new CarController(carRepository, httpResponse);
    });
}

configureContainer();
