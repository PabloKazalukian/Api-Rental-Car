import { Request, Response } from 'express';

export interface IEmailController {
    createEmail(req: Request, res: Response): Promise<Response>;
}
