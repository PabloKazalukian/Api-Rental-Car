// controllers/index.ts
import {
    authService,
    carRepository,
    discountRepository,
    paymentRepository,
    requestRepository,
    userDiscountRepository,
    userRepository
} from '../../../gateways/repositories/index.service';
import { HttpResponse } from '../../../gateways/response/http.response';
import { AuthController } from './auth.controller';
import { CarController } from './car.controller';
import { DiscountController } from './discount.controller';
import { EmailController } from './email.controller';
import { PaymentController } from './payment.controller';
import { UserController } from './user.controller';
import { RequestController } from './request.controller';
import { RefreshTokenUseCase } from '../../../../application/use-case/auth/refresh-token.use-case';
import { GoogleLoginUseCase } from '../../../../application/use-case/auth/google-login.use-case';
import { LoginUseCase } from '../../../../application/use-case/auth/login.use-case';
import { UserDiscountController } from './user-discount.controller';
import { CreateDiscountUseCase } from '../../../../application/use-case/discount/create-discount.use-case';
import { CreateUserDiscountUseCase } from '../../../../application/use-case/user-discount/create.user-case';
import { CreatePaymentUseCase } from '../../../../application/use-case/payment/payment.use-case';

const httpResponse = new HttpResponse();

const loginUseCase = new LoginUseCase(authService);
const googleLoginUseCase = new GoogleLoginUseCase(userRepository);
const refreshTokenUseCase = new RefreshTokenUseCase(userRepository);
export const authController = new AuthController(loginUseCase, googleLoginUseCase, refreshTokenUseCase, httpResponse);

const createDiscountUseCase = new CreateDiscountUseCase(discountRepository);
export const discountController = new DiscountController(createDiscountUseCase, discountRepository, httpResponse);

const createUDiscountUseCase = new CreateUserDiscountUseCase(userDiscountRepository, userRepository, discountRepository);
export const userDiscountController = new UserDiscountController(createUDiscountUseCase, userDiscountRepository, httpResponse);

const createPaymentUseCase = new CreatePaymentUseCase();
export const paymentController = new PaymentController(createPaymentUseCase, paymentRepository, httpResponse);
export const requestController = new RequestController(requestRepository, carRepository, httpResponse);
export const userController = new UserController(userRepository, httpResponse);
export const carController = new CarController(carRepository, httpResponse);
export const emailController = new EmailController(httpResponse);
