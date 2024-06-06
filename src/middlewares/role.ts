import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/config';
import controller from '../controllers/AuthController';



export const checkRole = (roleA: Array<string>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const { userId } = res.locals.jwtpayload;
        try {

            let result: any = await controller.getUserById(userId);
            const { role } = result[0];
            if (roleA.includes(role)) {
                next();
            } else {
                return res.status(401).send('no Autorizado');
            }

        }
        catch (e) {
            return res.status(401).send('no Autorizado');
        }
    }
}