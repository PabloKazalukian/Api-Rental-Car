import { Request, Response } from 'express';
export interface IUserController {
    getAllUser(req: Request, res: Response): Promise<Response>;
    getUserById(req: Request, res: Response): Promise<Response>;
    createUser(req: Request, res: Response): Promise<Response>;
    modifyUser(req: Request, res: Response): Promise<Response>;
    modifyPassword(req: Request, res: Response): Promise<Response>;
    deleteUser(req: Request, res: Response): Promise<Response>;
    verifyEmail(req: Request, res: Response): Promise<Response>;
    verifyUsername(req: Request, res: Response): Promise<Response>;
}
