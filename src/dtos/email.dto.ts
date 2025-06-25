import { BaseDTO } from "../config/base.dto";
import { IsNotEmpty } from "class-validator";

export class EmailDTO extends BaseDTO {
    @IsNotEmpty()
    name!: string;

    @IsNotEmpty()
    email!: string;

    @IsNotEmpty()
    message!: string;

    subject?: string;
}
