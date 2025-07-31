import { Router } from "express";
import { EmailMiddleware } from "../middlewares/email.middleware";
import { emailController } from "../controllers/index.controller";

const router = Router();
const middleware = new EmailMiddleware();
// this.router.get('/email', (req, res) => { this.controller.(req, res) });
router.post('/email', (req, res, next) => [middleware.emailValidator(req, res, next)], (req, res) => { emailController.createEmail(req, res); });

export const EmailRouter = router;