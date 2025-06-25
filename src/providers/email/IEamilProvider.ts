import { EmailDTO } from "../../dtos/email.dto";

export interface IEmailProvider {
    sendEmail(data: EmailDTO): Promise<any>;
}