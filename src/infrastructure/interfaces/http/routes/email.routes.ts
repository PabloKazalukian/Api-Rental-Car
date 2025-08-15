import { Router } from "express";
import { emailController } from "../controllers/index.controller";
import { emailMiddleware } from "../../../../application/middlewares/index.middleware";

const router = Router();
// this.router.get('/email', (req, res) => { this.controller.(req, res) });
router.post('/email', emailMiddleware.emailValidator.bind(emailMiddleware), (req, res) => { emailController.createEmail(req, res); });

export const EmailRouter = router;