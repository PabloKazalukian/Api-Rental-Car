import { NextFunction, Request, Response } from 'express';

export interface IRequestMiddleware {
    requestValidator(req: Request, res: Response, next: NextFunction): void;
    requestIdsValidator(req: Request, res: Response, next: NextFunction): void;
}
