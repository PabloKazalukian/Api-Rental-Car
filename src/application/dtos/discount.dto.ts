import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { BaseDTO } from "../../infrastructure/config/base.dto";
import { DiscountType } from "../../infrastructure/db/entities/discount.entity";
import { UserEntity } from "../../infrastructure/db/entities/user.entity";
import { RequestEntity } from "../../infrastructure/db/entities/request.entity";

export class DiscountDTO extends BaseDTO {

    @IsNotEmpty()
    codeDiscount!: string;

    @IsNotEmpty()
    initialDate!: Date;

    @IsNotEmpty()
    expirationDate!: Date;

    @IsNotEmpty()
    @IsEnum(DiscountType)
    type!: DiscountType;

    @IsOptional()
    @IsNumber()
    percentage!: number;

    @IsOptional()
    @IsNumber()
    amount!: number;

    @IsNotEmpty()
    status!: boolean;

    @IsNotEmpty()
    users!: UserEntity[] // o number[], si usás id numérico

    @IsOptional()
    request_id!: RequestEntity; // o number
}