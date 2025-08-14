import { EmailDTO } from "../../application/dtos/email.dto";
import { IEmailProvider } from "./IEamilProvider";

export abstract class BaseEmailProvider implements IEmailProvider {
    abstract sendEmail(data: EmailDTO): Promise<any>;

    protected validateFields(data: EmailDTO): void {
        if (!data.email || !data.message || !data.name) {
            throw new Error("Los campos name, email y message son obligatorios.");
        }
    }

    protected formatHtmlMessage(name: string, email: string, message: string): string {
        return `
      <div>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message}</p>
      </div>
    `;
    }
}
