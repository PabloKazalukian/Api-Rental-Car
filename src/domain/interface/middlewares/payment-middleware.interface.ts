import { NextFunction, Request, Response } from 'express';

export interface IPaymentMiddleware {
    paymentValidator(req: Request, res: Response, next: NextFunction): void;
}
