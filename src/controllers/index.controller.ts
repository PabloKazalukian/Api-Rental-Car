// controllers/index.ts
import { authService, carService, discountService, emailService, paymentService, requestService, userService } from "../services/index.service";
import { AuthController } from "./auth.controller";
import { CarController } from "./car.controller";
import { DiscountController } from "./discount.controller";
import { EmailController } from "./email.controller";
import { PaymentController } from "./payment.controller";
import { RequestController } from "./request.controller";
import { UserController } from "./user.controller";

export const requestController = new RequestController(requestService);
export const userController = new UserController(userService);
export const authController = new AuthController(userService, authService);
export const paymentController = new PaymentController(paymentService);
export const discountController = new DiscountController(discountService);
export const carController = new CarController(carService);
export const emailController = new EmailController()
