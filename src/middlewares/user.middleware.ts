import { NextFunction, Request, Response } from "express";
import { UserDTO, UserRole } from "../dto/user.dto";
import { validate } from "class-validator";
import { HttpResponse } from '../shared/http.response';
import { JwtMiddleware } from "./jwt.middleware";

export class UserMiddleware extends JwtMiddleware {
    constructor(private httpResponse: HttpResponse = new HttpResponse()) {
        super();
    }
    userValidator(req: Request, res: Response, next: NextFunction) {
        const { username, password, email, role } = req.body;
        const valid = new UserDTO();

        valid.username = username;
        valid.password = password;
        valid.email = email;
        if (!role) {
            valid.role = UserRole.USER;
        } else {
            valid.role = role;
        }

        validate(valid).then((err) => {
            if (err.length > 0) {
                return this.httpResponse.Error(res, err);
            } else {
                next();
            }
        });
    }
}