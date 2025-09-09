import { Request, Response } from 'express';

export interface IUserDiscountController {
    getAllUserDiscount(req: Request, res: Response): Promise<Response>;
    getUserDiscountById(req: Request, res: Response): Promise<Response>;
    createUserDiscount(req: Request, res: Response): Promise<Response>;
    paymentUserDiscount(req: Request, res: Response): Promise<Response>;
}
