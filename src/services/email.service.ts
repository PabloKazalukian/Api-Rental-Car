import { EmailDTO } from "../application/dtos/email.dto";
import { IEmailProvider } from "../providers/email/IEamilProvider";

export class EmailService {
    constructor(private readonly provider: IEmailProvider) { }

    async send(data: EmailDTO) {
        return this.provider.sendEmail(data);
    }
}
