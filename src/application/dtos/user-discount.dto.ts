import { UserDiscountStatus } from "../../infrastructure/db/entities/user-discount.entity";
import { BaseDTO } from "../../infrastructure/config/base.dto";
import { IsDate, IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { UserEntity } from "../../infrastructure/db/entities/user.entity";
import { DiscountEntity } from "../../infrastructure/db/entities/discount.entity";
import { PaymentEntity } from "../../infrastructure/db/entities/payment.entity";



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