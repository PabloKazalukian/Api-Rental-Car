import { DiscountEntity } from "../../domain/entities/discount.entity";
import { PaymentEntity } from "../../domain/entities/payment.entity";
import { UserDiscountStatus } from "../../domain/entities/user-discount.entity";
import { UserEntity } from "../../domain/entities/user.entity";
import { BaseDTO } from "../../infrastructure/config/base.dto";
import { IsDate, IsEnum, IsNotEmpty, IsOptional } from "class-validator";



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