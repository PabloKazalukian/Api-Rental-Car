import { Request, Response, NextFunction } from "express";
import { validate } from "class-validator";
import { HttpResponse } from "../../shared/http.response";
import { EmailDTO } from "../dtos/email.dto";
import { formatValidationErrors } from "../../shared/validators/error-formatter";

export class EmailMiddleware {
    constructor(private httpResponse: HttpResponse) { }

    emailValidator(req: Request, res: Response, next: NextFunction) {

        const { name, email, message } = req.body;
        const valid = new EmailDTO();
        valid.name = name;
        valid.email = email;
        valid.message = message;

        Object.assign(valid, req.body);

        validate(valid).then(errors => {
            if (errors.length > 0) {
                res.status(400).json({ message: errors[0].constraints });
                return this.httpResponse.Error(res, formatValidationErrors(errors));
            } else {
                next();
            }
        });
    }
}
