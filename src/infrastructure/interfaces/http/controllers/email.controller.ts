import { Request, Response } from "express";
import { HttpResponse } from "../../../gateways/response/http.response";
import { emailRepository } from "../../../gateways/repositories/index.service"; 

export class EmailController {
    constructor(private readonly httpResponse: HttpResponse) { }

    async createEmail(req: Request, res: Response) {
        try {
            const result = await emailRepository.send(req.body);
            return res.status(201).json({ message: "Email enviado!", result });
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }
}

