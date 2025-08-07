import { NextFunction, Request, Response } from "express";
import { validate } from "class-validator";
import { HttpResponse } from "../shared/http.response";
import { DiscountDTO } from "../dtos/discount.dto";

export class DiscountMiddleware {
    constructor(private httpResponse: HttpResponse) { }

    discountValidator(req: Request, res: Response, next: NextFunction) {
        const { codeDiscount, initialDate, expirationDate, percentage, status, users, request_id, type } = req.body;
        const valid = new DiscountDTO();

        valid.codeDiscount = codeDiscount;
        valid.initialDate = new Date(initialDate);
        valid.expirationDate = new Date(expirationDate);
        valid.percentage = percentage;
        valid.status = status;
        valid.users = users;
        valid.request_id = request_id;
        valid.type = type;

        validate(valid).then((err) => {
            if (err.length > 0) {
                const formattedErrors = err.map(errs => ({
                    property: errs.property,
                    messages: Object.values(errs.constraints || {})
                }));
                return this.httpResponse.Error(res, formattedErrors);
            } else {
                next();
            }
        });
    }
}