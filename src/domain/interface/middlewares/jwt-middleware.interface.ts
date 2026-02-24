import { NextFunction, Request, Response } from 'express';

export interface IJwtMiddleware {
    passAuth(type: string, options?: any): any;
    checkAdminRole(req: Request, res: Response, next: NextFunction): any;
}
