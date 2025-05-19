import { AuthController } from '../controllers/auth.controller';
import { JwtMiddleware } from '../middlewares/jwt.middleware';
import { Routes } from "./routes";


export class AuthRouter extends Routes<AuthController, JwtMiddleware> {
    constructor() {
        super(AuthController, JwtMiddleware);
    }

    routes(): void {
        this.router.post('/auth/login', this.middleware.passAuth("login"), (req, res) => { this.controller.login(req, res) });
        this.router.get('/auth/google', (req, res, next) => {
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
            this.middleware.passAuth("google", { scope: ['profile', 'email'] })(req, res, next);
        });
        this.router.get('/auth/google/callback', this.middleware.passAuth("google"), (req, res) => this.controller.loginGoogle(req, res));
        this.router.get('/auth/me', this.middleware.passAuth('jwt', { session: false }), (req, res) => { res.json(req.cookies.accessToken); });
        this.router.get('/auth/logout', this.middleware.passAuth('jwt', { session: false }), (req, res) => { this.controller.logout(req, res) });
    }
}