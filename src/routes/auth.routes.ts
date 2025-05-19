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
            const protocol = process.env.NODE_ENV === 'production' ? 'https' : req.protocol;
            const host = req.get('host'); // ej: localhost:3000 o api-rental-car-9niy.onrender.com
            const callbackURL = `${protocol}://${host}/api/auth/google/callback`;

            // Guardalo en una cookie o en la sesión si usás
            res.cookie('google_callback_url', callbackURL, {
                httpOnly: true,
                maxAge: 5 * 60 * 1000,
                sameSite: 'lax',
                secure: process.env.NODE_ENV === 'production',
            });

            // Continúa con la estrategia
            this.middleware.passAuth("google", {
                scope: ['profile', 'email'],
                callbackURL, // ⬅️ usamos el dinámico aquí
            })(req, res, next);
        });
        // this.router.get('/auth/google/callback', this.middleware.passAuth("google"), (req, res) => this.controller.loginGoogle(req, res));
        this.router.get('/auth/google/callback', (req, res, next) => {
            const callbackURL = req.cookies.google_callback_url || '/api/auth/google/callback';

            this.middleware.passAuth("google", { callbackURL })(req, res, () => {
                this.controller.loginGoogle(req, res); // ✅ Acá va tu login final
            });
        });

        this.router.get('/auth/me', this.middleware.passAuth('jwt', { session: false }), (req, res) => { res.json(req.cookies.accessToken); });
        this.router.get('/auth/logout', this.middleware.passAuth('jwt', { session: false }), (req, res) => { this.controller.logout(req, res) });
    }
}