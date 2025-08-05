import { Request, Response } from "express";
import { AuthService } from '../services/auth.service';
import { HttpResponse } from "../shared/http.response";
import { UserEntity } from "../entities/user.entity";
import { UserService } from "../services/user.service";
import { UserDTO, UserRole } from "../dtos/user.dto";
import { JwtPayload } from "jsonwebtoken";
import { clearCookies, setAuthGoogleCookie } from "../utils/cookie.utils";

export class AuthController {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
        private readonly httpResponse: HttpResponse
    ) { }


    async login(req: Request, res: Response) {
        try {

            const userEncode = req.user as UserEntity;
            const encode = await this.authService.generateJWT(userEncode);
            if (!encode) {
                return this.httpResponse.Unauthorized(res, 'Token invalido');
            }
            res.header('Content-Type', 'application/json');
            res.cookie("access_token", encode.accessToken, {
                maxAge: 60000 * 60,
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                path: '/',
            });
            res.write(JSON.stringify(encode));
            res.end();

        } catch (err) {
            return this.httpResponse.Error(res, 'Ocurrio un error por aca');
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

            setAuthGoogleCookie(res, encode.accessToken);
            const redirectUri = req.cookies.redirectUri || 'http://localhost:4200/auth/callback';
            clearCookies(res, ['redirectUri']);

            res.redirect(redirectUri);
            // res.redirect(`${redirectUri}/callback`);

        } catch (err) {
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

            clearCookies(res, ["access_token", "accessToken", "refresh_token", "jwtAccessToken", "googleAccessToken"]);

            res.cookie('access_token', encode.accessToken, {
                maxAge: 60 * 60 * 1000,
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                path: '/',
            });

            return res.json(encode);
        } catch (err) {
            console.error('[REFRESH ERROR]', err);
            return this.httpResponse.Error(res, 'Ocurrió un error');
        }
    }

    logout(req: Request, res: Response) {
        try {
            clearCookies(res, ["access_token", 'accessToken', "refresh_token", "jwtAccessToken", "googleAccessToken"]);

            return this.httpResponse.Ok(res, 'Logout exitoso');

        } catch (err) {
            return this.httpResponse.Error(res, 'Ocurrio un error');
        }
    }
}