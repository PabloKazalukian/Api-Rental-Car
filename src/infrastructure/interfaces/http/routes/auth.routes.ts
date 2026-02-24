import { Router, Request, Response } from 'express';
import { setReedirectGoogleCookie } from '../../../utils/cookie.utils';
import { IAuthController } from '../../../../domain/interface/controllers/auth-controller.interface';
import { Container } from '../../../di/container';
import { IJwtMiddleware } from '../../../../domain/interface/middlewares/jwt-middleware.interface';

const jwtMiddleware = Container.resolve<IJwtMiddleware>('IJwtMiddleware');
const router = Router();

const resolveHandler = <K extends keyof IAuthController>(controllerName: string, methodName: K) => {
    return async (req: Request, res: Response) => {
        const controller = Container.resolve<IAuthController>(controllerName);
        await controller[methodName](req, res);
    };
};

router.post('/auth/login', jwtMiddleware.passAuth('login'), resolveHandler('IAuthController', 'login'));
router.get('/auth/google', (req, res, next) => {
    const redirectUri = req.query.redirectUri as string;
    if (redirectUri) setReedirectGoogleCookie(res, redirectUri);

    jwtMiddleware.passAuth('google', { scope: ['profile', 'email'] })(req, res, next);
});
router.get('/auth/google/callback', jwtMiddleware.passAuth('google'), resolveHandler('IAuthController', 'loginGoogle'));
router.post('/auth/refresh', jwtMiddleware.passAuth('jwt', { session: false }), resolveHandler('IAuthController', 'refresh'));
router.get('/auth/me', jwtMiddleware.passAuth('jwt', { session: false }), (req, res) => {
    res.json(req.cookies.access_token);
});
router.get('/auth/logout', jwtMiddleware.passAuth('jwt', { session: false }), resolveHandler('IAuthController', 'logout'));

export const AuthRouter = router;
