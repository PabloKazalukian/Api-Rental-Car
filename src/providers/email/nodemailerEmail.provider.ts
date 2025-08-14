import nodemailer from "nodemailer";
import { EmailDTO } from "../../application/dtos/email.dto";
import { BaseEmailProvider } from "./baseEmail.provider";

export class NodemailerEmailProvider extends BaseEmailProvider {
    private transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    async sendEmail(data: EmailDTO): Promise<any> {
        this.validateFields(data);

        return this.transporter.sendMail({
            from: process.env.EMAIL,
            to: process.env.EMAIL,
            subject: data.subject || `Nuevo mensaje de ${data.name}`,
            html: this.formatHtmlMessage(data.name, data.email, data.message),
        });
    }
}
