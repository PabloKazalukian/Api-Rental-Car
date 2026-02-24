import { Router } from 'express';
import { Request, Response } from 'express';
import { Container } from '../../../di/container';
import { IUserController } from '../../../../domain/interface/controllers/user-controller.interface';
import { IUserMiddleware } from '../../../../domain/interface/middlewares/user-middleware.interface';
import { IJwtMiddleware } from '../../../../domain/interface/middlewares/jwt-middleware.interface';

const router = Router();
const userMiddleware = Container.resolve<IUserMiddleware>('IUserMiddleware');
const jwtMiddleware = Container.resolve<IJwtMiddleware>('IJwtMiddleware');

const resolveHandler = <K extends keyof IUserController>(controllerName: string, methodName: K) => {
    return async (req: Request, res: Response) => {
        const controller = Container.resolve<IUserController>(controllerName);
        await controller[methodName](req, res);
    };
};

router.get('/user', resolveHandler('IUserController', 'getAllUser'));
router.get('/user/:idUser', resolveHandler('IUserController', 'getUserById'));
router.put('/user/modifyPass/:idUser', resolveHandler('IUserController', 'modifyPassword'));
router.put('/user/:idUser', userMiddleware.userValidator, resolveHandler('IUserController', 'modifyUser'));
router.post('/user', userMiddleware.userValidator, resolveHandler('IUserController', 'createUser'));
router.post('/user/verifyEmail', resolveHandler('IUserController', 'verifyEmail'));
router.post('/user/verifyUsername', resolveHandler('IUserController', 'verifyUsername'));
router.delete(
    '/user/:idUser',
    jwtMiddleware.passAuth('jwt'),
    jwtMiddleware.checkAdminRole,
    resolveHandler('IUserController', 'deleteUser')
);

export const UserRouter = router;
