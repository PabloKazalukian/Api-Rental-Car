import { Router, Request, Response } from 'express';
import { MiddlewareFactory } from '../../../../application/factories/middleware.factory';
import { IEmailController } from '../../../../domain/interface/controllers/email-controller.interface';
import { Container } from '../../../di/container';
import { IEmailMiddleware } from '../../../../domain/interface/middlewares/email-middleware.interface';

const router = Router();
const emailMiddleware = Container.resolve<IEmailMiddleware>('IEmailMiddleware');

const resolveHandler = <K extends keyof IEmailController>(controllerName: string, methodName: K) => {
    return async (req: Request, res: Response) => {
        const controller = Container.resolve<IEmailController>(controllerName);
        await controller[methodName](req, res);
    };
};

router.post('/email', emailMiddleware.emailValidator, resolveHandler('IEmailController', 'createEmail'));

export const EmailRouter = router;
