import { Request, Response } from 'express';

export interface IPaymentController {
    getAllPayment(req: Request, res: Response): Promise<Response>;
    getPaymentById(req: Request, res: Response): Promise<Response>;
    createPayment(req: Request, res: Response): Promise<Response>;
}
