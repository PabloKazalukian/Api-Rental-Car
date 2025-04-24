import { AuthController } from '../controllers/auth.controller';
import { JwtMiddleware } from '../middlewares/jwt.middleware';
import { Routes } from "./routes";


export class AuthRouter extends Routes<AuthController, JwtMiddleware> {
    constructor() {
        super(AuthController, JwtMiddleware);
    }

    routes(): void {
        this.router.post('/auth/login', this.middleware.passAuth("login"), (req, res) => { this.controller.login(req, res) });
        this.router.post('/auth/google', (req, res) => { this.controller.loginGoogle(req, res) });
        this.router.get('/auth/google/callback', this.middleware.passAuth("google"), (req, res) => this.controller.loginGoogle(req, res));

    }
}