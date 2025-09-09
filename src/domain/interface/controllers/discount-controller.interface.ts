import { Request, Response } from 'express';

export interface IDiscountController {
    getAllDiscount(req: Request, res: Response): Promise<Response>;
    getDiscountById(req: Request, res: Response): Promise<Response>;
    createDiscount(req: Request, res: Response): Promise<Response>;
}
