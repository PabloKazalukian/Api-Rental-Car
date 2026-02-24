import { Router, Request, Response } from 'express';
import { IRequestController } from '../../../../domain/interface/controllers/request-controller.interface';
import { Container } from '../../../di/container';
import { IRequestMiddleware } from '../../../../domain/interface/middlewares/request-middleware.interface';

const router = Router();
const requestMiddleware = Container.resolve<IRequestMiddleware>('IRequestMiddleware');

const resolveHandler = <K extends keyof IRequestController>(controllerName: string, methodName: K) => {
    return async (req: Request, res: Response) => {
        const controller = Container.resolve<IRequestController>(controllerName);
        await controller[methodName](req, res);
    };
};

router.get('/request', resolveHandler('IRequestController', 'getAllRequest'));
router.get('/request/:id', resolveHandler('IRequestController', 'getRequestById'));
router.post('/request/bulk', requestMiddleware.requestIdsValidator, resolveHandler('IRequestController', 'getRequestsByIds'));
router.get('/request/allOfUserId/:user_id', resolveHandler('IRequestController', 'getRequestByUser'));
router.get('/request/allOfCarId/:car_id', resolveHandler('IRequestController', 'getRequestBycar'));
router.put('/request/cancel', resolveHandler('IRequestController', 'cancelRequest'));
router.put('/request/confirm', resolveHandler('IRequestController', 'confirmRequest'));

router.post('/request', requestMiddleware.requestValidator, resolveHandler('IRequestController', 'createRequest'));

export const RequestRouter = router;
