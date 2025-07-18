import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { HttpResponse } from "../shared/http.response";
import { UserEntity } from "../entities/user.entity";
import { UserRole } from "../dtos/user.dto";
// import { Response } from "@sendgrid/helpers/classes";

export class JwtMiddleware {
    constructor(public httResponse: HttpResponse = new HttpResponse()) { }

    // jwtMiddleware(req: Request, res: Response, next: NextFunction) {

    // }

    passAuth(type: string, options = {}) {
        return (req: Request, res: Response, next: NextFunction) => {
            console.log('pesao', req.body)
            passport.authenticate(type, { session: false, ...options })(req, res, next);
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