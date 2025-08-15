import { NextFunction, Request, Response } from "express";
import { validate } from "class-validator";
import { UserDTO, UserRole } from "../dtos/user.dto";
import { HttpResponse } from "../../infrastructure/gateways/response/http.response";
import { JwtMiddleware } from "./jwt.middleware";
import { formatValidationErrors } from "../../shared/validators/error-formatter";
import { UserRepository } from "../../infrastructure/gateways/repositories/user.repository";

export class UserMiddleware extends JwtMiddleware {
    constructor(
        private httpResponse: HttpResponse,
        private userRepository : UserRepository = new UserRepository()
    ) {
        super(httpResponse);
    }

    async mergeUser(req: Request, res: Response, next: NextFunction) {
        try {
            console.log(req.params.idUser);
            const user = await this.userRepository.findById(req.params.idUser);
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
            valid.role = UserRole.USER;
        } else {
            valid.role = role;
        }
        req.body = valid;

        validate(valid).then((err) => {
            if (err.length > 0) {
                return this.httpResponse.Error(res, formatValidationErrors(err));
            } else {
                next();
            }
        });
    }
}
