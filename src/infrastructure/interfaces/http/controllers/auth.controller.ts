import { Request, Response } from 'express';
import { clearCookies, setAuthCookie, setAuthGoogleCookie } from '../../../utils/cookie.utils';
import { ILoginUseCase } from '../../../../application/use-case/auth/login.use-case';
import { IGoogleLoginUseCase, UserGoogle } from '../../../../application/use-case/auth/google-login.use-case';
import { IRefreshTokenUseCase } from '../../../../application/use-case/auth/refresh-token.use-case';
import { catchError } from '../../../../shared/exeptions/catch-error.util';
import { User } from '../../../../domain/entities/user';
import { IAuthController } from '../../../../domain/interface/controllers/auth-controller.interface';
import { IHttpResponse } from '../../../gateways/response/http-singleton.response';

export class AuthController implements IAuthController {
    constructor(
        private readonly loginUseCase: ILoginUseCase,
        private readonly googleLoginUseCase: IGoogleLoginUseCase,
        private readonly refreshTokenUseCase: IRefreshTokenUseCase,
        private readonly httpResponse: IHttpResponse
    ) {}

    async login(req: Request, res: Response) {
        try {
            const encode = await this.loginUseCase.execute(req.user as User);
            if (!encode) return this.httpResponse.Unauthorized(res, 'Token invalido');

            setAuthCookie(res, encode.accessToken);
            return res.json(encode);
        } catch (err) {
            return catchError(err, res, this.httpResponse);
        }
    }

    async loginGoogle(req: Request, res: Response) {
        try {
            const user: User = await this.googleLoginUseCase.execute(req.user as UserGoogle);

            const encode = await this.loginUseCase.execute(user);
            if (!encode) return this.httpResponse.Unauthorized(res, 'Token invalido');

            res.header('Content-Type', 'application/json');
            setAuthGoogleCookie(res, encode.accessToken);
            const redirectUri = req.cookies.redirectUri || 'http://localhost:4200/auth/callback';
            clearCookies(res, ['redirectUri']);

            res.redirect(redirectUri);
        } catch (err) {
            return catchError(err, res, this.httpResponse);
        }
    }

    async refresh(req: Request, res: Response) {
        try {
            const foundUser: User = await this.refreshTokenUseCase.execute(req.user);
            if (!foundUser) return this.httpResponse.Unauthorized(res, 'Usuario no encontrado');

            const encode = await this.loginUseCase.execute(foundUser);

            clearCookies(res, ['access_token']);
            setAuthCookie(res, encode.accessToken);

            return res.json(encode);
        } catch (err) {
            return catchError(err, res, this.httpResponse);
        }
    }

    logout(req: Request, res: Response) {
        try {
            clearCookies(res, ['access_token']);

            return this.httpResponse.Ok(res, 'Logout exitoso');
        } catch (err) {
            return catchError(err, res, this.httpResponse);
        }
    }
}
