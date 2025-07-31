import { Request, Response } from "express";
import { AuthService } from '../services/auth.service';
import { HttpResponse } from "../shared/http.response";
import { UserEntity } from "../entities/user.entity";
import { UserService } from "../services/user.service";
import { UserDTO, UserRole } from "../dtos/user.dto";
import { JwtPayload } from "jsonwebtoken";

export class AuthController {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
        private readonly httpResponse: HttpResponse = new HttpResponse()
    ) { }


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
                // 👌 No existe, lo registramos
                user = await this.userService.createUser(googleUser);
            }

            const encode = await this.authService.generateJWT(user);
            if (!encode) {
                return this.httpResponse.Unauthorized(res, 'Token invalido');
            }

            res.header('Content-Type', 'application/json');

            res.cookie("accessToken", encode.accessToken, {
                maxAge: 60000 * 60,
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
                path: '/',
                // sameSite: 'None', // 🔥 para que funcione cross-origin
                // maxAge: 3600 * 1000
            });

            const redirectUri = req.cookies.redirectUri || 'http://localhost:4200/auth/callback';

            res.clearCookie('redirectUri'); // limpiar la cookie después de usarla
            res.redirect(redirectUri);
            // res.redirect(`${redirectUri}/callback`);

        } catch (err) {
            console.log(err);
            return this.httpResponse.Error(res, 'Ocurrio un error');
        }
    }

    async refresh(req: Request, res: Response) {
        try {
            const user = req.user as JwtPayload;
            if (!user?.sub) return this.httpResponse.Unauthorized(res, 'Token inválido');

            const foundUser = await this.userService.findById(user.sub);
            if (!foundUser) return this.httpResponse.Unauthorized(res, 'Usuario no encontrado');

            const encode = await this.authService.generateJWT(foundUser);

            res.clearCookie('accessToken', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                path: '/',
            });
            this.clearCookies(res, ["access_token", "refresh_token", "jwtAccessToken", "googleAccessToken"]);


            res.cookie('accessToken', encode.accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                path: '/',
                maxAge: 60 * 60 * 1000,
            });

            return res.json(encode);
        } catch (err) {
            console.error('[REFRESH ERROR]', err);
            return this.httpResponse.Error(res, 'Ocurrió un error');
        }
    }


    logout(req: Request, res: Response) {
        try {
            console.log('oy estoy funcionando.')
            this.clearCookies(res, ["access_token", "refresh_token", "jwtAccessToken", "googleAccessToken"]);

            return this.httpResponse.Ok(res, 'Logout exitoso');

        } catch (err) {
            return this.httpResponse.Error(res, 'Ocurrio un error');
        }
    }

    async clearCookies(res: Response, names: string[]) {
        for (const name of names) {
            res.clearCookie(name, {
                httpOnly: true,
                sameSite: "strict",
                secure: true,
                path: "/",
            });
        }
    }

}