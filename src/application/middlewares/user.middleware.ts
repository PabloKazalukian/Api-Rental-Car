import { NextFunction, Request, Response } from 'express';
import { CreateUserDTO } from '../dtos/user.dto';
import { EntityValidator } from '../../infrastructure/utils/entity-validator';
import { User, UserRole } from '../../domain/entities/user';
import { IHttpResponse } from '../../infrastructure/gateways/response/http-singleton.response';
import { IUserMiddleware } from '../../domain/interface/middlewares/user-middleware.interface';
import { IUserRepository } from '../../domain/interface/repositories/userRepository.interface';

export class UserMiddleware implements IUserMiddleware {
    constructor(
        private userRepository: IUserRepository,
        private readonly httpResponse: IHttpResponse
    ) {}

    async mergeUser(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await this.userRepository.findById(req.params.idUser);
            if (!user) return this.httpResponse.NotFound(res, 'Usuario no encontrado');

            req.body = { ...user, ...req.body }; // el body pisa al original
            next();
        } catch (err) {
            return this.httpResponse.Error(res, 'Error interno al fusionar usuario');
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
