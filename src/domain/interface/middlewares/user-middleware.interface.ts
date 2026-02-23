import { NextFunction, Request, Response } from 'express';

export interface IUserMiddleware {
    mergeUser(req: Request, res: Response, next: NextFunction): void;
    userValidator(req: Request, res: Response, next: NextFunction): void;
}
