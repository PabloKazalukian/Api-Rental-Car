import { IsNotEmpty } from "class-validator";
import { BaseDTO } from "../config/base.dto";
import { UserEntity } from "../entities/user.entity";
import { RequestEntity } from "../entities/request.entity";

export class DiscountDTO extends BaseDTO {

    @IsNotEmpty()
    codeDiscount!: string;

    @IsNotEmpty()
    initialDate!: string;

    @IsNotEmpty()
    expirationDate!: string;

    @IsNotEmpty()
    percentage!: number;

    @IsNotEmpty()
    status!: boolean;

    @IsNotEmpty()
    users!: UserEntity[]

    @IsNotEmpty()
    request_id!: RequestEntity;

}