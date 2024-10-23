import { AuthController } from '../controllers/auth.controller';
import { JwtMiddleware } from '../middlewares/jwt.middleware';
import { UserMiddleware } from "../middlewares/user.middleware";
import { Routes } from "./routes";


export class AuthRouter extends Routes<AuthController, JwtMiddleware> {
    constructor() {
        super(AuthController, JwtMiddleware);
    }

    routes(): void {
        this.router.post('/auth/login', this.middleware.passAuth("login"), (req, res) => { this.controller.login(req, res) });
    }
}