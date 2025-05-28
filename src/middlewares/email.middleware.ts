import { Request, Response, NextFunction } from "express";
import { validate } from "class-validator";
import { HttpResponse } from "../shared/http.response";
import { EmailDTO } from "../dtos/email.dto";

export class EmailMiddleware {
    constructor(private httpResponse: HttpResponse = new HttpResponse()) { }

    emailValidator(req: Request, res: Response, next: NextFunction) {
        const valid = new EmailDTO();
        Object.assign(valid, req.body);

        validate(valid).then(errors => {
            if (errors.length > 0) {
                res.status(400).json({ message: errors[0].constraints });
                return this.httpResponse.Error(res, errors);
            } else {
                next();
            }
        });
    }
}
