// controllers/index.ts
import { authService, carService, discountService, emailService, paymentService, requestService, userService } from "../services/index.service";
import { HttpResponse } from '../shared/http.response';
import { AuthController } from "./auth.controller";
import { CarController } from "./car.controller";
import { DiscountController } from "./discount.controller";
import { EmailController } from "./email.controller";
import { PaymentController } from "./payment.controller";
import { UserController } from "./user.controller";
import { RequestController } from "./request.controller";

const httpResponse = new HttpResponse();

export const requestController = new RequestController(requestService, carService, httpResponse);
export const userController = new UserController(userService, httpResponse);
export const authController = new AuthController(userService, authService, httpResponse);
export const paymentController = new PaymentController(paymentService, httpResponse);
export const discountController = new DiscountController(discountService, httpResponse);
export const carController = new CarController(carService, httpResponse);
export const emailController = new EmailController(httpResponse);
