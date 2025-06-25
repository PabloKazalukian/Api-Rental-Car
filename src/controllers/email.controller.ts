import { Request, Response } from "express";
import { HttpResponse } from "../shared/http.response";
import { EmailService } from "../services/email.service";
import { ResendEmailProvider } from "../providers/email/resend.provider";
// import { NodemailerEmailProvider } from "../providers/email/nodemailerEmail.provider";

export class EmailController {
    private readonly http = new HttpResponse();
    private readonly emailService = new EmailService(
        new ResendEmailProvider() // <- Cambiá esto por NodemailerEmailProvider si querés
    );

    async createEmail(req: Request, res: Response) {
        try {
            console.log("Datos recibidos:", req.body);
            const result = await this.emailService.send(req.body);
            return res.status(201).json({ message: "Email enviado!", result });
        } catch (error) {
            return this.http.Error(res, error);
        }
    }
}
