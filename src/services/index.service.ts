import { ResendEmailProvider } from '../providers/email/resend.provider';
import { AuthService } from './auth.service';
import { CarService } from './car.service';
import { DiscountService } from './discount.service';
import { EmailService } from './email.service';
import { PaymentService } from './payment.service';
import { RequestService } from './request.service';
import { UserService } from './user.service';

const resendProvider = new ResendEmailProvider();

export const requestService = new RequestService();
export const userService = new UserService();
export const authService = new AuthService(userService);
export const carService = new CarService();
export const paymentService = new PaymentService();
export const discountService = new DiscountService();
export const emailService = new EmailService(resendProvider);

