import { Request, Response } from 'express';
import { HttpResponse } from '../../../gateways/response/http.response';
import { PaymentRepository } from '../../../gateways/repositories/payment.repository';
import { CreatePaymentUseCase } from '../../../../application/use-case/payment/payment.use-case';

export class PaymentController {
    constructor(
        private readonly createPaymentUseCase: CreatePaymentUseCase,
        private readonly paymentSvc: PaymentRepository,
        private readonly httpResponse: HttpResponse
    ) {}

    async getAllPayment(req: Request, res: Response) {
        try {
            const data = await this.paymentSvc.findAllPayment();
            return this.httpResponse.Ok(res, data);
        } catch (err) {
            return this.httpResponse.Error(res, 'Ocurrio un error');
        }
    }

    async getPaymentById(req: Request, res: Response) {
        try {
            const data = await this.paymentSvc.findById(req.params.id);
            if (!data) return this.httpResponse.NotFound(res, 'Solicitud no encontrada');
            return this.httpResponse.Ok(res, data);
        } catch (err) {
            return this.httpResponse.Error(res, err);
        }
    }

    async createPayment(req: Request, res: Response) {
        try {
            // let data = await this.paymentSvc.createPayment(req.body);
            let data = await this.createPaymentUseCase.execute(req.body);

            // if (data == 0) return this.httpResponse.NotFound(res);
            //create payment

            return this.httpResponse.Created(res, data);
        } catch (err) {
            return this.httpResponse.Error(res, err);
        }
    }
}
