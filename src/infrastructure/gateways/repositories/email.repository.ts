import { EmailDTO } from "../../../application/dtos/email.dto";
import { IEmailProvider } from "../email/IEamilProvider";

export class EmailRepository {
    constructor(private readonly provider: IEmailProvider) { }

    async send(data: EmailDTO) {
        return this.provider.sendEmail(data);
    }
}
