import { Router } from 'express';
import { Request, Response } from 'express';
import { userController } from '../controllers/index.controller';
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

router.get('/user', (req, res) => {
    resolveHandler('userController', 'getAllUser');
});
router.get('/user/:idUser', (req, res) => {
    resolveHandler('userController', 'getUserById');
});
router.put('/user/modifyPass/:idUser', (req, res) => {
    resolveHandler('userController', 'modifyPassword');
});
router.put('/user/:idUser', userMiddleware.userValidator.bind(userMiddleware), (req, res) => {
    resolveHandler('userController', 'modifyUser');
});
router.post('/user', userMiddleware.userValidator.bind(userMiddleware), (req, res) => {
    resolveHandler('userController', 'createUser');
});
router.post('/user/verifyEmail', (req, res) => {
    resolveHandler('userController', 'verifyEmail');
});
router.post('/user/verifyUsername', (req, res) => {
    resolveHandler('userController', 'verifyUsername');
});
router.delete('/user/:idUser', userMiddleware.passAuth('jwt'), userMiddleware.checkAdminRole.bind(userMiddleware), (req, res) => {
    resolveHandler('userController', 'deleteUser');
});

export const UserRouter = router;
