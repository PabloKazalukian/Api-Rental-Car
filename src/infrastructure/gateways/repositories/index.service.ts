import { CartRepository } from './cart.repository';
import { ResendEmailProvider } from '../email/resend.provider';
import { AuthService } from './auth.service';
import { CarRepository } from './car.repository';
import { DiscountRepository } from './discount.repository';
import { EmailRepository } from './email.repository';
import { PaymentRepository } from './payment.repository';
import { RequestRepository } from './request.repository';
import { UserDiscountRepository } from './user-discount.repository';
import { UserRepository } from './user.repository';

const resendProvider = new ResendEmailProvider();

// export const userRepository = new UserRepository();
// export const authService = new AuthService(userRepository);
export const requestRepository = new RequestRepository();
// export const carRepository = new CarRepository();
export const paymentRepository = new PaymentRepository();
export const discountRepository = new DiscountRepository();
export const emailRepository = new EmailRepository(resendProvider);
// export const userDiscountRepository = new UserDiscountRepository();

export const cartRepository = new CartRepository();
