import { NextFunction, Request, Response } from 'express';
export interface ICartMiddleware {
    cartValidator(req: Request, res: Response, next: NextFunction): void;
}
