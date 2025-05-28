import { NextFunction, Request, Response } from "express";
import { UserDTO, UserRole } from "../dtos/user.dto";
import { validate } from "class-validator";
import { HttpResponse } from '../shared/http.response';
import { JwtMiddleware } from "./jwt.middleware";

export class UserMiddleware extends JwtMiddleware {
    constructor(private httpResponse: HttpResponse = new HttpResponse()) {
        super();
    }
    userValidator(req: Request, res: Response, next: NextFunction) {
        const { username, password1, password2, email, role } = req.body;
        const valid = new UserDTO();

        valid.username = username;
        if (password1 === password2) {
            valid.password = password1;
        }
        valid.email = email;
        if (!role) {
            console.log(req.body)
            valid.role = UserRole.USER;
        } else {
            valid.role = role;
        }
        req.body = valid;

        validate(valid).then((err) => {
            if (err.length > 0) {
                return this.httpResponse.Error(res, err);
            } else {
                next();
            }
        });
    }
}