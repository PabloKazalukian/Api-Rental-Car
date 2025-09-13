// controllers/index.ts
import { carRepository, requestRepository, userRepository } from '../../../gateways/repositories/index.service';
import { CarController } from './car.controller';
import { EmailController } from './email.controller';
import { UserController } from './user.controller';
import { RequestController } from './request.controller';
import { HttpResponseSingleton } from '../../../gateways/response/http-singleton.response';
import { ControllerFactory } from '../../../../application/factories/controller.factory';

// const HttpResponseSingleton.getInstance() = new HttpResponseSingleton.getInstance()();

export const authController = ControllerFactory.createAuthController();
export const discountController = ControllerFactory.createDiscountController();
export const userDiscountController = ControllerFactory.createUserDiscountController();
export const paymentController = ControllerFactory.createPaymentController();
export const cartController = ControllerFactory.createCartController();

export const requestController = new RequestController(requestRepository, carRepository, HttpResponseSingleton.getInstance());
export const userController = new UserController(userRepository, HttpResponseSingleton.getInstance());
export const carController = new CarController(carRepository, HttpResponseSingleton.getInstance());
export const emailController = new EmailController(HttpResponseSingleton.getInstance());
