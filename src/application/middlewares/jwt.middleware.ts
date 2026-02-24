import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import { UserEntity } from '../../infrastructure/db/entities/user.entity';
import { UserRole } from '../../domain/entities/user';
import { IErrorResponse } from '../../infrastructure/gateways/response/http-singleton.response';
import { IJwtMiddleware } from '../../domain/interface/middlewares/jwt-middleware.interface';

export class JwtMiddleware implements IJwtMiddleware {
    constructor(public httpResponse: IErrorResponse) {}

    passAuth(type: string, options = {}) {
        return (req: Request, res: Response, next: NextFunction) => {
            console.log('autenticando');
            passport.authenticate(type, { session: false, ...options }, (err: any, user: any, info: any) => {
                if (err) {
                    return this.httpResponse.Error(res, 'Error en autenticación');
                }

                if (!user) {
                    const message = info?.message || 'Credenciales inválidas';
                    return this.httpResponse.Unauthorized(res, message);
                }

                req.user = user;
                next();
            })(req, res, next);
        };
    }

    checkAdminRole(req: Request, res: Response, next: NextFunction) {
        //para que el request del usuario sea del formato de la entidad usuario
        const user = req.user as UserEntity;
        console.log(user.role);
        if (user.role !== UserRole.ADMIN) {
            console.log('error falta aqui', this.httpResponse);

            return this.httpResponse.Unauthorized(res, ' no tienes permisos');
        }

        return next();
    }
}
