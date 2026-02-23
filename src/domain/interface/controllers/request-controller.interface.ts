import { Request, Response } from 'express';

export interface IRequestController {
    getAllRequest(req: Request, res: Response): Promise<Response>;
    getRequestById(req: Request, res: Response): Promise<Response>;
    getRequestsByIds(req: Request, res: Response): Promise<Response>;
    getRequestByUser(req: Request, res: Response): Promise<Response>;
    getRequestBycar(req: Request, res: Response): Promise<Response>;
    cancelRequest(req: Request, res: Response): Promise<Response>;
    confirmRequest(req: Request, res: Response): Promise<Response>;
    createRequest(req: Request, res: Response): Promise<Response>;
}
