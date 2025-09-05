import { Router } from 'express';
import { emailController } from '../controllers/index.controller';
import { MiddlewareFactory } from '../../../../application/factories/middleware.factory';

const router = Router();
const emailMiddleware = MiddlewareFactory.createEmailMiddleware();

router.post('/email', emailMiddleware.emailValidator.bind(emailMiddleware), (req, res) => {
    emailController.createEmail(req, res);
});

export const EmailRouter = router;
