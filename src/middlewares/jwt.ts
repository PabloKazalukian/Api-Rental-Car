import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/config';


export const checkJwt = async (req: Request, res: Response, next: NextFunction) => {
    const token = <string>req.headers['auth'];
    let jwtpayload;

    try {
        jwtpayload = <any>jwt.verify(token, config.auth.key);
        res.locals.jwtpayload = jwtpayload;
    }
    catch (e) {
        return res.status(401).send('error Token');
    }

    const { userId, username } = jwtpayload;


    const newToken = jwt.sign({ userId, username }, config.auth.key, { expiresIn: config.auth.expires })
    res.setHeader('token', newToken);

    //call Next
    next();

}