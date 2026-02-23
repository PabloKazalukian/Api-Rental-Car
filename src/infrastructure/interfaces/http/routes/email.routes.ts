import { Router, Request, Response } from 'express';
import { emailController } from '../controllers/index.controller';
import { MiddlewareFactory } from '../../../../application/factories/middleware.factory';
import { IEmailController } from '../../../../domain/interface/controllers/email-controller.interface';
import { Container } from '../../../di/container';

const router = Router();
const emailMiddleware = MiddlewareFactory.createEmailMiddleware();

const resolveHandler = <K extends keyof IEmailController>(controllerName: string, methodName: K) => {
    return async (req: Request, res: Response) => {
        const controller = Container.resolve<IEmailController>(controllerName);
        await controller[methodName](req, res);
    };
};

router.post('/email', emailMiddleware.emailValidator.bind(emailMiddleware), resolveHandler('IEmailController', 'createEmail'));

export const EmailRouter = router;
