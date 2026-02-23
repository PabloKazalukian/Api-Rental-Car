import { Router, Request, Response } from 'express';
import { IRequestController } from '../../../../domain/interface/controllers/request-controller.interface';
import { MiddlewareFactory } from '../../../../application/factories/middleware.factory';
import { Container } from '../../../di/container';

const router = Router();
const requestMiddleware = MiddlewareFactory.createRequestMiddleware();

const resolveHandler = <K extends keyof IRequestController>(controllerName: string, methodName: K) => {
    return async (req: Request, res: Response) => {
        const controller = Container.resolve<IRequestController>(controllerName);
        await controller[methodName](req, res);
    };
};

router.get('/request', resolveHandler('IRequestController', 'getAllRequest'));
router.get('/request/:id', resolveHandler('IRequestController', 'getRequestById'));
router.post(
    '/request/bulk',
    requestMiddleware.requestIdsValidator.bind(requestMiddleware),
    resolveHandler('IRequestController', 'getRequestsByIds')
);
router.get('/request/allOfUserId/:user_id', resolveHandler('IRequestController', 'getRequestByUser'));
router.get('/request/allOfCarId/:car_id', resolveHandler('IRequestController', 'getRequestBycar'));
router.put('/request/cancel', resolveHandler('IRequestController', 'cancelRequest'));
router.put('/request/confirm', resolveHandler('IRequestController', 'confirmRequest'));

router.post('/request', requestMiddleware.requestValidator.bind(requestMiddleware), resolveHandler('IRequestController', 'createRequest'));

export const RequestRouter = router;
