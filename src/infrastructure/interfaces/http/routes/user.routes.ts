import { Router } from 'express';
import { Request, Response } from 'express';
// import { UserController } from '../controllers/index.controller';
import { MiddlewareFactory } from '../../../../application/factories/middleware.factory';
import { Container } from '../../../di/container';
import { IUserController } from '../../../../domain/interface/controllers/user-controller.interface';

const router = Router();
const userMiddleware = MiddlewareFactory.createUserMiddleware();

const resolveHandler = <K extends keyof IUserController>(controllerName: string, methodName: K) => {
    return async (req: Request, res: Response) => {
        const controller = Container.resolve<IUserController>(controllerName);
        await controller[methodName](req, res);
    };
};

router.get('/user', resolveHandler('IUserController', 'getAllUser'));
router.get('/user/:idUser', resolveHandler('IUserController', 'getUserById'));
router.put('/user/modifyPass/:idUser', resolveHandler('IUserController', 'modifyPassword'));
router.put('/user/:idUser', userMiddleware.userValidator.bind(userMiddleware), resolveHandler('IUserController', 'modifyUser'));
router.post('/user', userMiddleware.userValidator.bind(userMiddleware), resolveHandler('IUserController', 'createUser'));
router.post('/user/verifyEmail', resolveHandler('IUserController', 'verifyEmail'));
router.post('/user/verifyUsername', resolveHandler('IUserController', 'verifyUsername'));
router.delete(
    '/user/:idUser',
    userMiddleware.passAuth('jwt'),
    userMiddleware.checkAdminRole.bind(userMiddleware),
    resolveHandler('IUserController', 'deleteUser')
);

export const UserRouter = router;
