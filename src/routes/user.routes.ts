import { UserController } from "../controllers/user.controller";
import { UserMiddleware } from "../middlewares/user.middleware";
import { Routes } from "./routes";


export class UserRouter extends Routes<UserController, UserMiddleware> {
    constructor() {
        super(UserController, UserMiddleware);
    }

    routes(): void {
        this.router.get('/user', (req, res) => { this.controller.getAllUser(req, res) });
        this.router.get('/user', (req, res) => { this.controller.getUserById(req, res) });
        this.router.post('/user', (req, res, next) => [this.middleware.userValidator(req, res, next)], (req, res) => { this.controller.createUser(req, res); });
        this.router.post('/user/verifyEmail', (req, res) => { this.controller.verifyEmail(req, res); });
        this.router.post('/user/verifyUsername', (req, res) => { this.controller.verifyUsername(req, res); });
        this.router.put('/modifyPass/:idUser', (req, res) => { this.controller.modifyPassword(req, res); });
        this.router.put('/modifyUser/:idUser', (req, res) => { this.controller.modifyUser(req, res); });
        this.router.delete('/user/:idUser', this.middleware.passAuth("jwt"), (req, res, next) => [this.middleware.checkAdminRole(req, res, next)], (req, res) => { this.controller.deleteUser(req, res); });
    }
}
