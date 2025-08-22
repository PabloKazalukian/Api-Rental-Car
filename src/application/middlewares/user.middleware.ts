import { NextFunction, Request, Response } from "express";
import { CreateUserDTO } from "../dtos/user.dto";
import { HttpResponse } from "../../infrastructure/gateways/response/http.response";
import { JwtMiddleware } from "./jwt.middleware";
import { UserRepository } from "../../infrastructure/gateways/repositories/user.repository";
import { EntityValidator } from "../../infrastructure/utils/entity-validator";
import { User, UserRole } from "../../domain/entities/user";
import { HttpResponseSingleton } from "../../infrastructure/gateways/response/http-singleton.response";

export class UserMiddleware extends JwtMiddleware {
    constructor(
        private userRepository: UserRepository
    ) {
        super(HttpResponseSingleton.getInstance());;
    }

    async mergeUser(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await this.userRepository.findById(req.params.idUser);
            if (!user)
                return this.httpResponse.NotFound(res, "Usuario no encontrado");

            req.body = { ...user, ...req.body }; // el body pisa al original
            next();
        } catch (err) {
            return this.httpResponse.Error(res, "Error interno al fusionar usuario");
        }
    }

    async userValidator(req: Request, res: Response, next: NextFunction) {
        try {

            const userDomain: User = req.body;
            if (!userDomain.role) {
                userDomain.role = UserRole.USER;
            }

            const validator = new EntityValidator<User, CreateUserDTO>(CreateUserDTO);
            const validatedDTO = await validator.validate(userDomain);

            req.body = validatedDTO;

            next();

        } catch (err) {
            return this.httpResponse.Error(res, (err as Error).message);
        }
    }
}
