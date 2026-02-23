import { NextFunction, Request, Response } from 'express';

export interface IDiscountMiddleware {
    discountValidator(req: Request, res: Response, next: NextFunction): void;
}
