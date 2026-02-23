import { NextFunction, Request, Response } from 'express';

export interface ICarMiddleware {
    carValidator(req: Request, res: Response, next: NextFunction): void;
}
