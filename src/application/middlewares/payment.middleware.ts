import { NextFunction, Request, Response } from "express";
import { validate } from "class-validator";
import { HttpResponse } from "../../infrastructure/gateways/response/http.response";
import { formatValidationErrors } from "../../shared/validators/error-formatter";
import { PaymentDTO } from "../dtos/payment.dto";

export class PaymentMiddleware {
    constructor(private httpResponse: HttpResponse) { }

    paymentValidator(req: Request, res: Response, next: NextFunction) {
        const { paid_date, created_time, automatic, request_id } = req.body;
        const valid = new PaymentDTO();

        valid.paid_date = paid_date;
        valid.created_time = created_time;
        valid.automatic = automatic;
        valid.request_id = request_id;

        validate(valid).then((err) => {
            if (err.length > 0) {
                return this.httpResponse.Error(res, formatValidationErrors(err));
            } else {
                next();
            }
        });
    }
}