import { MercadoPagoConfig, Payment } from 'mercadopago';
import * as dotenv from 'dotenv';
import { HttpException } from '../../../shared/exeptions/http.exeption';
import { HttpStatus } from '../../../shared/constants/http-status.enum';
import { AuthErrorMessages } from '../../../shared/constants/error-messages.enum';

export class CreatePaymentUseCase {
    constructor() {}
    async execute(data: any) {
        try {
            console.log(data);

            const client = new MercadoPagoConfig({
                accessToken: process.env.MP_ACCESS_TOKEN || '',
                options: { timeout: 5000 }
            });

            const payment = new Payment(client);

            return payment
                .create({ body: data })
                .then((dat) => {
                    console.log(dat);
                    return dat;
                })
                .catch((err) => console.log(err));
        } catch (err) {
            throw new HttpException(HttpStatus.UNAUTHORIZED, AuthErrorMessages.INVALID_CREDENTIALS);
        }
    }
}
