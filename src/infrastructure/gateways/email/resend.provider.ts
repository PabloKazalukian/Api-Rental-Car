import { Resend } from "resend";
import { BaseEmailProvider } from "./baseEmail.provider";
import { EmailDTO } from "../../../application/dtos/email.dto";

export class ResendEmailProvider extends BaseEmailProvider {
    private readonly resend = new Resend(process.env.RESEND_API_KEY);

    async sendEmail(data: EmailDTO): Promise<any> {
        this.validateFields(data);

        return this.resend.emails.send({
            from: "onboarding@resend.dev",
            to: process.env.EMAIL || "", // tu email
            subject: data.subject || `Nuevo mensaje de ${data.name}`,
            html: this.formatHtmlMessage(data.name, data.email, data.message),
        });
    }
}
