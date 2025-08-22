import { UserRepository } from "../../infrastructure/gateways/repositories/user.repository";
import { HttpResponseSingleton } from "../../infrastructure/gateways/response/http-singleton.response";
import { CarMiddleware } from "../middlewares/car.middleware";
import { DiscountMiddleware } from "../middlewares/discount.middleware";
import { EmailMiddleware } from "../middlewares/email.middleware";
import { JwtMiddleware } from "../middlewares/jwt.middleware";
import { PaymentMiddleware } from "../middlewares/payment.middleware";
import { RequestMiddleware } from "../middlewares/request.middleware";
import { UserDiscountMiddleware } from "../middlewares/user-discount.middleware";
import { UserMiddleware } from "../middlewares/user.middleware";

export class MiddlewareFactory {

  static createCarMiddleware() {
    return new CarMiddleware(HttpResponseSingleton.getInstance());
  }

  static createDiscountMiddleware() {
    return new DiscountMiddleware();
  }

  static createEmailMiddleware() {
    return new EmailMiddleware(HttpResponseSingleton.getInstance());
  }

  static createJwtMiddleware() {
    return new JwtMiddleware(HttpResponseSingleton.getInstance());
  }

  static createpaymentMiddleware() {
    return new PaymentMiddleware(HttpResponseSingleton.getInstance());
  }

  static createRequestMiddleware() {
    return new RequestMiddleware();
  }

  static createUserMiddleware() {
    return new UserMiddleware(new UserRepository());
  }

  static createUserDiscountMiddleware() {
    return new UserDiscountMiddleware()
  }

}
