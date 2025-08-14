import { BaseEntity } from "../../config/base.entity";
import { BaseDTO } from "../../config/base.dto";
import { IsEnum, IsNotEmpty } from "class-validator";
import { RequestEntity } from "../../domain/entities/request.entity";

export enum Automatic {
    YES = "yes",
    NO = "no"
}

export class PaymentDTO extends BaseDTO {

    @IsNotEmpty()
    paid_date!: Date;

    @IsNotEmpty()
    created_time!: Date;

    @IsNotEmpty()
    @IsEnum(Automatic)
    automatic!: Automatic;

    @IsNotEmpty()
    request_id!: RequestEntity;
}