import { NextFunction, Request, Response } from "express";
import { validate } from "class-validator";
import { DiscountDTO } from "../dtos/discount.dto";
import { formatValidationErrors } from "../../shared/validators/error-formatter";
import { JwtMiddleware } from "./jwt.middleware";
import { HttpResponseSingleton } from "../../infrastructure/gateways/response/http-singleton.response";

export class DiscountMiddleware extends JwtMiddleware {
    constructor() {
        super(HttpResponseSingleton.getInstance())
    }

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
                return this.httpResponse.Error(res, formatValidationErrors(err));
            } else {
                next();
            }
        });
    }
}