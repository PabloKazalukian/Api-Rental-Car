import { userRepository } from "../../infrastructure/gateways/repositories/index.service";
import { HttpResponse } from "../../infrastructure/gateways/response/http.response";
import { CarMiddleware } from "./car.middleware";
import { DiscountMiddleware } from "./discount.middleware";
import { EmailMiddleware } from "./email.middleware";
import { JwtMiddleware } from './jwt.middleware';
import { PaymentMiddleware } from "./payment.middleware";
import { RequestMiddleware } from "./request.middleware";
import { UserMiddleware } from "./user.middleware";


const httpResponse = new HttpResponse();

export const carMiddleware = new CarMiddleware(httpResponse);
export const discountMiddleware = new DiscountMiddleware(httpResponse);
export const emailMiddleware = new EmailMiddleware(httpResponse);
export const jwtMiddleware = new JwtMiddleware(httpResponse);
export const paymentMiddleware = new PaymentMiddleware(httpResponse);
export const requestMiddleware = new RequestMiddleware(httpResponse);
export const userMiddleware = new UserMiddleware(httpResponse,userRepository);
