import { UserRepository } from "../../infrastructure/gateways/repositories/user.repository";
import { HttpResponse } from "../../infrastructure/gateways/response/http.response";
import { CarMiddleware } from "../middlewares/car.middleware";
import { DiscountMiddleware } from "../middlewares/discount.middleware";
import { EmailMiddleware } from "../middlewares/email.middleware";
import { JwtMiddleware } from "../middlewares/jwt.middleware";
import { PaymentMiddleware } from "../middlewares/payment.middleware";
import { RequestMiddleware } from "../middlewares/request.middleware";
import { UserMiddleware } from "../middlewares/user.middleware";

export class MiddlewareFactory {

  static createCarMiddleware() {
    return new CarMiddleware(new HttpResponse());
  }

  static createDiscountMiddleware() {
    return new DiscountMiddleware(new HttpResponse());
  }
  
  static createEmailMiddleware(){
    return new EmailMiddleware(new HttpResponse());
  }

  static createJwtMiddleware() {
    return new JwtMiddleware(new HttpResponse());
  }

  static createpaymentMiddleware() {
    return new PaymentMiddleware(new HttpResponse());
  }

  static createRequestMiddleware() {
    return new RequestMiddleware(new HttpResponse());
  }

  static createUserMiddleware() {
    return new UserMiddleware(new HttpResponse(),new UserRepository());
  }

}
