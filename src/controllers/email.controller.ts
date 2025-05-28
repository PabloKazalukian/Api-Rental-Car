import { Request, Response } from "express";
import { HttpResponse } from "../shared/http.response";

export class EmailController {
    constructor(private readonly httpResponse: HttpResponse = new HttpResponse()) {}

    async getAllEmail(req: Request, res: Response) {
        try {
            return this.httpResponse.Ok(res, { message: "getAllEmail works!" });
        } catch (err) {
            return this.httpResponse.Error(res, err);
        }
    }

    async createEmail(req: Request, res: Response) {
        try {
            return res.status(201).json({ message: "createEmail works!", body: req.body });
        } catch (err) {
            return this.httpResponse.Error(res, err);
        }
    }
}