import { BaseDTO } from '../../infrastructure/config/base.dto';
import { IsNotEmpty } from "class-validator";

export class CartDTO extends BaseDTO {
    @IsNotEmpty()
    exampleField!: string;
}
