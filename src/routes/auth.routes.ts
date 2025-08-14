import { Router } from 'express';
import { authController } from '../controllers/index.controller';
import { jwtMiddleware } from '../application/middlewares/index.middleware';
import { setReedirectGoogleCookie } from '../utils/cookie.utils';

// const middleware = new JwtMiddleware();
const router = Router();

router.post('/auth/login', jwtMiddleware.passAuth("login"), (req, res) => { authController.login(req, res) });
router.get('/auth/google', (req, res, next) => {
    const redirectUri = req.query.redirectUri as string;
    if (redirectUri) setReedirectGoogleCookie(res, redirectUri);

    jwtMiddleware.passAuth("google", { scope: ['profile', 'email'] })(req, res, next);
});
router.get('/auth/google/callback', jwtMiddleware.passAuth("google"), (req, res) => authController.loginGoogle(req, res));
router.post('/auth/refresh', jwtMiddleware.passAuth('jwt', { session: false }), (req, res) => authController.refresh(req, res));
router.get('/auth/me', jwtMiddleware.passAuth('jwt', { session: false }), (req, res) => { res.json(req.cookies.access_token); });
router.get('/auth/logout', jwtMiddleware.passAuth('jwt', { session: false }), (req, res) => { authController.logout(req, res) });

export const AuthRouter = router;
