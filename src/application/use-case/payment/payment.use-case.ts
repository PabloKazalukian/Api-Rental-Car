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

            // const order = new Order(client);

            // const body = {
            //     type: 'online',
            //     processing_mode: 'automatic',
            //     total_amount: '1000.00',
            //     external_reference: 'ext_ref_1234',
            //     payer: {
            //         email: '<PAYER_EMAIL>'
            //     },
            //     transactions: {
            //         payments: [
            //             {
            //                 amount: '1000.00',
            //                 payment_method: {
            //                     id: 'master',
            //                     type: 'credit_card',
            //                     token: '<CARD_TOKEN>',
            //                     installments: 1,
            //                     statement_descriptor: 'Store name'
            //                 }
            //             }
            //         ]
            //     }
            // };

            // const requestOptions = {
            //     idempotencyKey: '<IDEMPOTENCY_KEY>'
            // };

            // order.create({ body }).then(console.log).catch(console.error);
            const payment = new Payment(client);

            return payment
                .create({ body: data })
                .then((dat) => {
                    console.log(dat);
                    return dat;
                })
                .catch((err) => console.log(err));

            // return 'as';
        } catch (err) {
            throw new HttpException(HttpStatus.UNAUTHORIZED, AuthErrorMessages.INVALID_CREDENTIALS);
        }
    }
}
