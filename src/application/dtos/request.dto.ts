import { BaseDTO } from "../../infrastructure/config/base.dto";
import { IsEnum, IsNotEmpty } from "class-validator";
import { CarEntity } from "../../infrastructure/db/entities/car.entity";
import { UserEntity } from "../../infrastructure/db/entities/user.entity";

export enum StateCar {
    REQUEST = "req",
    CONFIRM = "con",
    CANCEL = "can"
}

export class RequestDTO extends BaseDTO {

    @IsNotEmpty()
    amount!: number;

    @IsNotEmpty()
    initialDate!: Date;

    @IsNotEmpty()
    finalDate!: Date;

    @IsNotEmpty()
    @IsEnum(StateCar)
    state!: StateCar;

    @IsNotEmpty()
    user_id!: UserEntity;

    @IsNotEmpty()
    car_id!: CarEntity;
}

export class CreateRequestDTO {

    @IsNotEmpty()
    amount!: number;

    @IsNotEmpty()
    initialDate!: Date;

    @IsNotEmpty()
    finalDate!: Date;

    @IsNotEmpty()
    @IsEnum(StateCar)
    state!: StateCar;

    @IsNotEmpty()
    user_id!: UserEntity;

    @IsNotEmpty()
    car_id!: CarEntity;
}