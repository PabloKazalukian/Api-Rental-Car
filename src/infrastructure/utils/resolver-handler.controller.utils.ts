import { Request, Response } from 'express';

export type HttpHandler = (req: Request, res: Response) => Promise<Response>;

type HandlerKeys<T> = {
    [K in keyof T]: T[K] extends HttpHandler ? K : never;
}[keyof T];
