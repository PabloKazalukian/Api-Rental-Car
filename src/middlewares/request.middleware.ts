import { NextFunction, Request, Response } from "express";
import { RequestDTO } from "../dtos/request.dto";
import { validate } from "class-validator";
import { HttpResponse } from "../shared/http.response";

export class RequestMiddleware {
    constructor(private httpResponse: HttpResponse = new HttpResponse()) { }

    requestValidator(req: Request, res: Response, next: NextFunction) {
        const { amount, initialDate, finalDate, state, user_id, car_id } = req.body;
        const valid = new RequestDTO()

        valid.amount = amount;
        valid.car_id = car_id;
        valid.finalDate = finalDate;
        valid.initialDate = initialDate;
        valid.state = state;
        valid.user_id = user_id;


        validate(valid).then((err) => {
            if (err.length > 0) {
                return this.httpResponse.Error(res, err)
            } else {
                next();
            }
        });
    }
}