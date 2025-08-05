// controllers/index.ts
import { authService, carService, discountService, paymentService, requestService, userService } from "../services/index.service";
import { HttpResponse } from '../shared/http.response';
import { AuthController } from "./auth.controller";
import { CarController } from "./car.controller";
import { DiscountController } from "./discount.controller";
import { EmailController } from "./email.controller";
import { PaymentController } from "./payment.controller";
import { UserController } from "./user.controller";
import { RequestController } from "./request.controller";
import { LoginUseCase } from "../use-case/auth/login.use-case";
import { GoogleLoginUseCase } from '../use-case/auth/google-login.use-case';
import { RefreshTokenUseCase } from "../use-case/auth/refresh-token.use-case";

const httpResponse = new HttpResponse();

const loginUseCase = new LoginUseCase(authService);
const googleLoginUseCase = new GoogleLoginUseCase(userService);
const refreshTokenUseCase = new RefreshTokenUseCase(userService);
export const authController = new AuthController(loginUseCase, googleLoginUseCase, refreshTokenUseCase, httpResponse);

export const requestController = new RequestController(requestService, carService, httpResponse);
export const userController = new UserController(userService, httpResponse);
export const paymentController = new PaymentController(paymentService, httpResponse);
export const discountController = new DiscountController(discountService, httpResponse);
export const carController = new CarController(carService, httpResponse);
export const emailController = new EmailController(httpResponse);
