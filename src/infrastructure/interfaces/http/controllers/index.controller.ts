// controllers/index.ts
import { authService, carRepository, discountRepository, paymentRepository, requestRepository, userRepository} from "../../../gateways/repositories/index.service";
import { HttpResponse } from '../../../gateways/response/http.response';
import { AuthController } from "./auth.controller";
import { CarController } from "./car.controller";
import { DiscountController } from "./discount.controller";
import { EmailController } from "./email.controller";
import { PaymentController } from "./payment.controller";
import { UserController } from "./user.controller";
import { RequestController } from "./request.controller";
import { RefreshTokenUseCase } from "../../../../application/use-case/auth/refresh-token.use-case";
import { GoogleLoginUseCase } from "../../../../application/use-case/auth/google-login.use-case";
import { LoginUseCase } from "../../../../application/use-case/auth/login.use-case";

const httpResponse = new HttpResponse();

const loginUseCase = new LoginUseCase(authService);
const googleLoginUseCase = new GoogleLoginUseCase(userRepository);
const refreshTokenUseCase = new RefreshTokenUseCase(userRepository);
export const authController = new AuthController(loginUseCase, googleLoginUseCase, refreshTokenUseCase, httpResponse);

export const requestController = new RequestController(requestRepository, carRepository, httpResponse);
export const userController = new UserController(userRepository, httpResponse);
export const paymentController = new PaymentController(paymentRepository, httpResponse);
export const discountController = new DiscountController(discountRepository, httpResponse);
export const carController = new CarController(carRepository, httpResponse);
export const emailController = new EmailController(httpResponse);
