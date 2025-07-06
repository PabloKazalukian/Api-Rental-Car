import { Request, Response } from "express";
import { AuthService } from '../services/auth.service';
import { HttpResponse } from "../shared/http.response";
import { UserEntity } from "../entities/user.entity";
import { UserService } from "../services/user.service";
import { UserDTO, UserRole } from "../dtos/user.dto";

export class AuthController {
    constructor(private readonly httpResponse: HttpResponse = new HttpResponse(),
        private readonly userService: UserService = new UserService(),
        private readonly authService: AuthService = new AuthService()) { }

    async login(req: Request, res: Response) {
        try {
            // console.log('post')
            const userEncode = req.user as UserEntity;
            const encode = await this.authService.generateJWT(userEncode);
            if (!encode) {
                return this.httpResponse.Unauthorized(res, 'Token invalido');
            }
            res.header('Content-Type', 'application/json');
            res.cookie("accessToken", encode.accessToken, {
                maxAge: 60000 * 60, httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                path: '/',
            });
            res.write(JSON.stringify(encode));
            res.end();

        } catch (err) {
            return this.httpResponse.Error(res, 'Ocurrio un error');
        }
    }

    async loginGoogle(req: Request, res: Response) {
        try {

            let googleUser = new UserDTO();
            googleUser.username = (req.user as any).name;
            googleUser.email = (req.user as any).email;
            googleUser.password = 'google-oauth-dummy';
            googleUser.role = UserRole.USER;


            let user = await this.userService.findUserByEmail(googleUser.email);

            if (!user) {
                // 👶 No existe, lo registramos
                user = await this.userService.createUser(googleUser);
            }

            const encode = await this.authService.generateJWT(user);
            if (!encode) {
                console.log('failed', encode);
                return this.httpResponse.Unauthorized(res, 'Token invalido');
            }

            res.header('Content-Type', 'application/json');
            console.log('passs ', req.query);
            res.cookie("accessToken", encode.accessToken, {
                maxAge: 60000 * 60,
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
                path: '/',
                // sameSite: 'None', // 🔥 para que funcione cross-origin
                // maxAge: 3600 * 1000
            });
            console.log('cookie', encode.accessToken);
            console.log('cookie en cookie', req.cookies.accessToken);
            const redirectUri = req.cookies.redirectUri || 'http://localhost:4200/auth/callback';
            res.clearCookie('redirectUri'); // limpiar la cookie después de usarla
            console.log('redirectUri', redirectUri)
            res.redirect(redirectUri);
            // res.redirect(`${redirectUri}/callback`);

        } catch (err) {
            console.log(err);
            return this.httpResponse.Error(res, 'Ocurrio un error');
        }
    }

    async logout(req: Request, res: Response) {
        try {

            res.clearCookie('accessToken', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                path: '/', // ⚠️ Este debe coincidir con el `path` usado cuando seteaste la cookie
            });

            return this.httpResponse.Ok(res, 'Logout exitoso');

        } catch (err) {
            return this.httpResponse.Error(res, 'Ocurrio un error');
        }
    }

}