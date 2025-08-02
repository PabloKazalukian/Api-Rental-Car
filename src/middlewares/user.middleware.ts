import { NextFunction, Request, Response } from "express";
import { UserDTO, UserRole } from "../dtos/user.dto";
import { validate } from "class-validator";
import { HttpResponse } from "../shared/http.response";
import { JwtMiddleware } from "./jwt.middleware";
import { UserService } from "../services/user.service";

export class UserMiddleware extends JwtMiddleware {
    constructor(
        private httpResponse: HttpResponse = new HttpResponse(),
        private userService: UserService = new UserService()
    ) {
        super();
    }

    async mergeUser(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await this.userService.findById(req.params.idUser);
            if (!user)
                return this.httpResponse.NotFound(res, "Usuario no encontrado");

            req.body = { ...user, ...req.body }; // el body pisa al original
            next();
        } catch (err) {
            return this.httpResponse.Error(res, "Error interno al fusionar usuario");
        }
    }
    userValidator(req: Request, res: Response, next: NextFunction) {
        const { username, password, confirmPassword, email, role } = req.body;
        const valid = new UserDTO();

        valid.username = username;
        if (password === confirmPassword) {
            valid.password = password;
        }
        valid.email = email;
        if (!role) {
            console.log(req.body);
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
