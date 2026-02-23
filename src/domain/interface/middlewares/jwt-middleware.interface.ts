import { NextFunction, Request, Response } from 'express';

export interface IJwtMiddleware {
    passAuth(type: string, options: {}): void;
    checkAdminRole(req: Request, res: Response, next: NextFunction): void;
}
