import { Request, Response } from "express";
import { RequestService } from "../services/request.service";
import { CarService } from "../services/car.service";
import { CarEntity } from "../entities/car.entity";
import { RequestDTO } from "../dto/request.dto";
import { HttpResponse } from "../shared/http.response";
import { PaymentService } from "../services/payment.service";

export class PaymentController {
    constructor(private readonly paymentSvc: PaymentService = new PaymentService(), private readonly httpResponse: HttpResponse = new HttpResponse()) { }

    async getAllPayment(req: Request, res: Response) {
        try {
            const data = await this.paymentSvc.findAllPayment();
            return this.httpResponse.Ok(res, data);
        } catch (err) {
            return this.httpResponse.Error(res, 'Ocurrio un error');
        }
    };

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
            let data = await this.paymentSvc.createPayment(req.body)

            // if (data == 0) return this.httpResponse.NotFound(res);
            //create payment


            return this.httpResponse.Created(res, data);
        } catch (err) {
            return this.httpResponse.Error(res, err);
        }
    }
}