import { UserController } from "../controllers/user.controller";
import { Routes } from "./routes";


export class UserRouter extends Routes<UserController> {
    constructor() {
        super(UserController)
    }

    routes(): void {
        this.router.get('/user', (req, res) => { this.controller.getUser(req, res) });
    }
}
