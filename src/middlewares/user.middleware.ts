import { NextFunction, Request, Response } from "express";
import { UserDTO, UserRole } from "../dto/user.dto";
import { validate } from "class-validator";
import { HttpResponse } from '../shared/http.response';

export class UserMiddleware {
    constructor(private httpResponse: HttpResponse = new HttpResponse()) { }
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