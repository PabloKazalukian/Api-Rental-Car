import { NextFunction, Request, Response } from 'express';

export interface IUserDiscountMiddleware {
    discountCreateValidator(req: Request, res: Response, next: NextFunction): void;
    discountConfirmValidator(req: Request, res: Response, next: NextFunction): void;
}
