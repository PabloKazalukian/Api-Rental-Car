import { Router } from 'express';
import { authController } from '../controllers/index.controller';
import { JwtMiddleware } from '../middlewares/jwt.middleware';

const middleware = new JwtMiddleware();
const router = Router();

router.post('/auth/login', middleware.passAuth("login"), (req, res) => { authController.login(req, res) });
router.get('/auth/google', (req, res, next) => {
    const redirectUri = req.query.redirectUri as string;
    console.log('redirectUri', redirectUri);
    if (redirectUri) {
        res.cookie('redirectUri', redirectUri, {
            httpOnly: false, // solo se necesita para redirección del navegador
            maxAge: 5 * 60 * 1000,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
        });
    }
    middleware.passAuth("google", { scope: ['profile', 'email'] })(req, res, next);
});
router.get('/auth/google/callback', middleware.passAuth("google"), (req, res) => authController.loginGoogle(req, res));
router.post('/auth/refresh', middleware.passAuth('jwt', { session: false }), (req, res) => authController.refresh(req, res));
router.get('/auth/me', middleware.passAuth('jwt', { session: false }), (req, res) => { res.json(req.cookies.accessToken); });
router.get('/auth/logout', middleware.passAuth('jwt', { session: false }), (req, res) => { authController.logout(req, res) });

export const AuthRouter = router;
