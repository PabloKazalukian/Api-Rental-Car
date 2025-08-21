import { NextFunction, Request, Response } from "express";
import { RequestDTO } from "../dtos/request.dto";
import { validate } from "class-validator";
import { HttpResponse } from "../../infrastructure/gateways/response/http.response";
import { formatValidationErrors } from "../../shared/validators/error-formatter";
import { JwtMiddleware } from "./jwt.middleware";

export class RequestMiddleware extends JwtMiddleware {
    constructor(private httpResponse: HttpResponse) {
        super(httpResponse)
    }

    requestValidator(req: Request, res: Response, next: NextFunction) {
        const { amount, initialDate, finalDate, state, user_id, car_id } = req.body;
        const valid = new RequestDTO();

        valid.amount = amount;
        valid.car_id = car_id;
        valid.finalDate = new Date(finalDate);
        valid.initialDate = new Date(initialDate);
        valid.state = state;
        valid.user_id = user_id;


        validate(valid).then((err) => {
            if (err.length > 0) {
                return this.httpResponse.Error(res, formatValidationErrors(err))
            } else {
                next();
            }
        });
    }
}