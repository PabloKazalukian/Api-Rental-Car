import { Request, Response } from "express";
import { AuthService } from '../services/auth.service';
import { HttpResponse } from "../shared/http.response";
import { UserEntity } from "../entities/user.entity";

export class AuthController extends AuthService {
    constructor(private readonly httpResponse: HttpResponse = new HttpResponse()) {
        super();
    }

    async login(req: Request, res: Response) {
        try {
            // console.log('post')
            const userEncode = req.user as UserEntity;
            const encode = await this.generateJWT(userEncode);
            if (!encode) {
                return this.httpResponse.Unauthorized(res, 'Token invalido');
            }
            res.header('Content-Type', 'application/json');
            res.cookie("accessToken", encode.accessToken, { maxAge: 60000 * 60 });
            res.write(JSON.stringify(encode));
            res.end();

        } catch (err) {
            return this.httpResponse.Error(res, 'Ocurrio un error');
        }
    }

}