import { EmailController } from "../controllers/email.controller";
import { EmailMiddleware } from "../middlewares/email.middleware";
import { Routes } from "./routes";

export class EmailRouter extends Routes<EmailController, EmailMiddleware> {
    constructor() {
        super(EmailController, EmailMiddleware)
    }

    routes(): void {
        // this.router.get('/email', (req, res) => { this.controller.(req, res) });
        this.router.post('/email', (req, res, next) => [this.middleware.emailValidator(req, res, next)], (req, res) => { this.controller.createEmail(req, res); });
    }
}
