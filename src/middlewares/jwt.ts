import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const checkJwt = async (req: Request, res: Response, next: NextFunction) => {
    const token = <string> req.headers['auth']
    let jwtpayload;
    console.log('prueba')

    try{
        jwtpayload = <any>jwt.verify(token, 'SECRETO')
        res.locals.jwtpayload = jwtpayload
    }
    catch(e){
        return res.status(401).send('error Token')
    }

    const {userId, username} = jwtpayload;

    console.log(userId,username)

    const newToken = jwt.sign({userId,username},'SECRETO',{expiresIn:'1h'})
    res.setHeader('token',newToken);

    //call Next
    next();

}