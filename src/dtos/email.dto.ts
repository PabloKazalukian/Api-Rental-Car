import { BaseDTO } from "../config/base.dto";
import { IsNotEmpty } from "class-validator";

export class EmailDTO extends BaseDTO {
    @IsNotEmpty()
    exampleField!: string;
}
