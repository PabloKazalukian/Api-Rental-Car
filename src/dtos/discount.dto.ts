import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { BaseDTO } from "../config/base.dto";
import { UserEntity } from "../entities/user.entity";
import { RequestEntity } from "../entities/request.entity";
import { DiscountType } from "../entities/discount.entity";

export class DiscountDTO extends BaseDTO {

    @IsNotEmpty()
    codeDiscount!: string;

    @IsNotEmpty()
    @IsDate()
    initialDate!: Date;

    @IsNotEmpty()
    @IsDate()
    expirationDate!: Date;

    @IsNotEmpty()
    @IsEnum(DiscountType)
    type!: DiscountType;

    @IsOptional()
    @IsNumber()
    percentage?: number;

    @IsOptional()
    @IsNumber()
    amount?: number;

    @IsNotEmpty()
    status!: boolean;

    // Ojo con esto: deberías recibir solo los IDs, no entidades enteras
    @IsOptional()
    users?: string[]; // o number[], si usás id numérico

    @IsOptional()
    request_id?: string; // o number
}