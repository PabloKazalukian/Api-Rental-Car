import { Request, Response } from 'express';

export interface IAuthController {
    login(req: Request, res: Response): Promise<Response>;
    loginGoogle(req: Request, res: Response): void;
    refresh(req: Request, res: Response): Promise<Response>;
    logout(req: Request, res: Response): Response;
}
