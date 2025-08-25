import { BaseDTO } from "../../infrastructure/config/base.dto";
import { IsDate, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";
import { UserEntity } from "../../infrastructure/db/entities/user.entity";
import { DiscountEntity } from "../../infrastructure/db/entities/discount.entity";
import { PaymentEntity } from "../../infrastructure/db/entities/payment.entity";
import { UserDiscountStatus } from "../../domain/entities/user-discount";



export class UserDiscountDTO extends BaseDTO {

        @IsNotEmpty()
        @IsDate()
        requestedDate!: Date;

        @IsOptional()
        @IsDate()
        issueDate!: Date;

        @IsNotEmpty()
        user!: UserEntity;

        @IsNotEmpty()
        discount!: DiscountEntity;

        @IsOptional()
        payment!: PaymentEntity;

        @IsNotEmpty()
        @IsEnum(UserDiscountStatus)
        status!: UserDiscountStatus;

}

export class CreateUserDiscountDTO {

        @IsUUID()
        userId!: string;

        @IsUUID()
        discountId!: string;

        @IsDate()
        issueDate!: Date;

        @IsOptional()
        @IsDate()
        requestedDate!: Date;

        @IsString()
        status!: UserDiscountStatus;
}