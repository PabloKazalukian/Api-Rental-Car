// src/controllers/email.controller.ts
import { Request, Response } from "express";
import { HttpResponse } from "../shared/http.response";
import { emailService } from "../services/index.service"; // ✅ ya inyectado

export class EmailController {
    private readonly http = new HttpResponse();

    async createEmail(req: Request, res: Response) {
        try {
            console.log("Datos recibidos:", req.body);
            const result = await emailService.send(req.body);
            return res.status(201).json({ message: "Email enviado!", result });
        } catch (error) {
            return this.http.Error(res, error);
        }
    }
}

