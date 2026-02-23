import { Request, Response } from 'express';

export interface ICartController {
    getCartById(req: Request, res: Response): Promise<Response | any>;
    createCart(req: Request, res: Response): Promise<Response>;
    updateCart(req: Request, res: Response): Promise<Response | any>;
}
