import { NextFunction, Request, Response } from "express";
import { HttpResponse } from "../../infrastructure/gateways/response/http.response";
import { formatValidationErrors } from "../../shared/validators/error-formatter";
import { validate } from "class-validator";
import { UserDiscountDTO } from "../dtos/user-discount.dto";
import { JwtMiddleware } from "./jwt.middleware";


export class UserDiscountMiddleware extends JwtMiddleware {
    constructor(private httpResponse: HttpResponse) {
        super(httpResponse)
    }

    discountCreateValidator(req: Request, res: Response, next: NextFunction) {
        const { issueDate, requestedDate, status, user, discount } = req.body;
        const valid = new UserDiscountDTO();

        valid.issueDate = new Date(issueDate);
        valid.requestedDate = new Date(requestedDate);
        valid.status = status;
        valid.user = user;
        valid.discount = discount;


        validate(valid).then((err) => {
            if (err.length > 0) {
                return this.httpResponse.Error(res, formatValidationErrors(err))
            } else {
                next();
            }
        });
    }

    discountConfirmValidator(req: Request, res: Response, next: NextFunction) {
        const { issueDate, requestedDate, status, user, discount, payment } = req.body;
        const valid = new UserDiscountDTO();

        valid.issueDate = new Date(issueDate);
        valid.requestedDate = new Date(requestedDate);
        valid.status = status;
        valid.user = user;
        valid.discount = discount;
        valid.payment = payment;


        validate(valid).then((err) => {
            if (err.length > 0) {
                return this.httpResponse.Error(res, formatValidationErrors(err))
            } else {
                next();
            }
        });
    }

}
