import { IsBoolean, IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { BaseDTO } from "../../infrastructure/config/base.dto";
import { DiscountType } from "../../domain/entities/discount";
import { UserDiscountEntity } from "../../infrastructure/db/entities/user-discount.entity";

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
    percentage?: number;

    @IsOptional()
    @IsNumber()
    amount?: number;

    @IsNotEmpty()
    @IsBoolean()
    status!: boolean;

    @IsNotEmpty()
    userDiscounts!: UserDiscountEntity[];
}


export class CreateDiscountDTO {

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
    percentage?: number;

    @IsOptional()
    @IsNumber()
    amount?: number;

    @IsNotEmpty()
    @IsBoolean()
    status!: boolean;

    @IsOptional()
    userDiscounts!: UserDiscountEntity[];

}