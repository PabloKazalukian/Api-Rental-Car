import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { HttpResponse } from "../../infrastructure/gateways/response/http.response";
import { UserRole } from "../dtos/user.dto";
import { UserEntity } from "../../infrastructure/db/entities/user.entity";
// import { Response } from "@sendgrid/helpers/classes";

export class JwtMiddleware {
    constructor(public httResponse: HttpResponse) { }

    passAuth(type: string, options = {}) {
        return (req: Request, res: Response, next: NextFunction) => {
            passport.authenticate(type, { session: false, ...options }, (err: any, user: any, info: any) => {
                if (err) {
                    return this.httResponse.Error(res, 'Error en autenticación');
                }

                if (!user) {
                    const message = info?.message || 'Credenciales inválidas';
                    return this.httResponse.Unauthorized(res, message);
                }

                req.user = user;
                return next();
            })(req, res, next);
        };
    }

    checkAdminRole(req: Request, res: Response, next: NextFunction) {
        //para que el request del usuario sea del formato de la entidad usuario
        const user = req.user as UserEntity;
        if (user.role !== UserRole.ADMIN) {
            return this.httResponse.Unauthorized(res, " no tienes permisos");
        }

        return next();
    }
}