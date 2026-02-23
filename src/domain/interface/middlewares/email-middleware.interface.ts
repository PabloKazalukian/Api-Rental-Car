import { NextFunction, Request, Response } from 'express';

export interface IEmailMiddleware {
    emailValidator(req: Request, res: Response, next: NextFunction): void;
}
