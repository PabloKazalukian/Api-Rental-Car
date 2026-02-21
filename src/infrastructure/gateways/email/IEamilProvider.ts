import { EmailDTO } from '../../../application/dtos/email.dto';

export interface IEmailProvider {
    sendEmail(data: EmailDTO): Promise<any>;
}

export interface IEmailRepository {
    send(data: EmailDTO): Promise<any>;
}
