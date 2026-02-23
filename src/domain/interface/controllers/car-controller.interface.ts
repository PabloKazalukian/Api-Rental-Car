import { Request, Response } from 'express';

export interface ICarController {
    getAllCar(req: Request, res: Response): Promise<Response>;
    getCarById(req: Request, res: Response): Promise<Response>;
    createCar(req: Request, res: Response): Promise<Response>;
    getPriceById(req: Request, res: Response): Promise<Response>;
}
