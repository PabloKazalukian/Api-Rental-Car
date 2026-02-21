import { EmailDTO } from '../../../application/dtos/email.dto';
import { IEmailProvider, IEmailRepository } from '../email/IEamilProvider';

export class EmailRepository implements IEmailRepository {
    constructor(private readonly provider: IEmailProvider) {}

    async send(data: EmailDTO) {
        return this.provider.sendEmail(data);
    }
}
