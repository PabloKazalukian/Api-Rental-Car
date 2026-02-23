import { Router } from 'express';
import { Container } from '../../../di/container';
import { Request, Response } from 'express';
import { ICarController } from '../../../../domain/interface/controllers/car-controller.interface';
import { ICarMiddleware } from '../../../../domain/interface/middlewares/car-middleware.interface';

const router = Router();

const carMiddleware = Container.resolve<ICarMiddleware>('ICarMiddleware');

const resolveHandler = <K extends keyof ICarController>(controllerName: string, methodName: K) => {
    return async (req: Request, res: Response) => {
        const controller = Container.resolve<ICarController>(controllerName);
        await controller[methodName](req, res);
    };
};

router.get('/car', resolveHandler('ICarController', 'getAllCar'));

router.get('/car/:id', carMiddleware.carValidator, resolveHandler('ICarController', 'getCarById'));
router.get('/car/price/:id', resolveHandler('ICarController', 'getPriceById'));
router.post('/car/create', resolveHandler('ICarController', 'createCar'));

export const CarRouter = router;
