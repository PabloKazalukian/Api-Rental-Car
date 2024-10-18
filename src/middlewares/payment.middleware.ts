import { NextFunction, Request, Response } from "express";
import { PaymentDTO } from "../dto/payment.dto";
import { validate } from "class-validator";
import { HttpResponse } from "../shared/http.response";

export class PaymentMiddleware {
    constructor(private httpResponse: HttpResponse = new HttpResponse()) { }

    paymentValidator(req: Request, res: Response, next: NextFunction) {
        const { amount, paid_date, created_time, automatic, request_id } = req.body;
        const valid = new PaymentDTO();

        valid.amount = amount;
        valid.paid_date = paid_date;
        valid.created_time = created_time;
        valid.automatic = automatic;
        valid.request_id = request_id;

        validate(valid).then((err) => {
            if (err.length > 0) {
                return this.httpResponse.Error(res, err);
            } else {
                next();
            }
        });
    }
}