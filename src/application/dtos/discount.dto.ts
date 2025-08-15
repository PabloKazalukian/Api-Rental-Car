import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { DiscountType } from "../../domain/entities/discount.entity";
import { UserEntity } from "../../domain/entities/user.entity";
import { RequestEntity } from "../../domain/entities/request.entity";
import { BaseDTO } from "../../infrastructure/config/base.dto";

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