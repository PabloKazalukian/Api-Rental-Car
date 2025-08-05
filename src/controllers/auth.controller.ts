import { Request, Response } from "express";
import { HttpResponse } from "../shared/http.response";
import { clearCookies, setAuthCookie, setAuthGoogleCookie } from "../utils/cookie.utils";
import { LoginUseCase } from "../use-case/auth/login.use-case";
import { GoogleLoginUseCase } from "../use-case/auth/google-login.use-case";
import { RefreshTokenUseCase } from "../use-case/auth/refresh-token.use-case";

export class AuthController {
    constructor(
        private readonly loginUseCase: LoginUseCase,
        private readonly googleLoginUseCase: GoogleLoginUseCase,
        private readonly refreshTokenUseCase: RefreshTokenUseCase,
        private readonly httpResponse: HttpResponse
    ) { }


    async login(req: Request, res: Response) {
        try {

            const encode = await this.loginUseCase.execute(req.user);
            if (!encode) return this.httpResponse.Unauthorized(res, 'Token invalido');

            res.header('Content-Type', 'application/json');
            setAuthCookie(res, encode.accessToken);

            res.write(JSON.stringify(encode));
            res.end();

        } catch (err) {
            console.log(err)
            return this.httpResponse.Error(res, 'Ocurrio un error por aca');
        }
    }

    async loginGoogle(req: Request, res: Response) {
        try {

            const user = await this.googleLoginUseCase.execute(req.user as any)

            const encode = await this.loginUseCase.execute(user);
            if (!encode) {
                return this.httpResponse.Unauthorized(res, 'Token invalido');
            }

            res.header('Content-Type', 'application/json');
            setAuthGoogleCookie(res, encode.accessToken);
            const redirectUri = req.cookies.redirectUri || 'http://localhost:4200/auth/callback';
            clearCookies(res, ['redirectUri']);

            res.redirect(redirectUri);

        } catch (err) {
            return this.httpResponse.Error(res, 'Ocurrio un error');
        }
    }

    async refresh(req: Request, res: Response) {
        try {

            const foundUser = await this.refreshTokenUseCase.execute(req.user);
            if (!foundUser) return this.httpResponse.Unauthorized(res, 'Usuario no encontrado');

            const encode = await this.loginUseCase.execute(foundUser);


            clearCookies(res, ["access_token"]);
            setAuthCookie(res, encode.accessToken);

            return res.json(encode);
        } catch (err) {

            console.error('[REFRESH ERROR]', err);
            return this.httpResponse.Error(res, 'Ocurrió un error');
        }
    }

    logout(req: Request, res: Response) {
        try {
            clearCookies(res, ["access_token"]);

            return this.httpResponse.Ok(res, 'Logout exitoso');

        } catch (err) {
            return this.httpResponse.Error(res, 'Ocurrio un error');
        }
    }
}