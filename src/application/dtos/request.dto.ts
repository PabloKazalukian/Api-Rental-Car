import { BaseDTO } from '../../infrastructure/config/base.dto';
import { ArrayNotEmpty, IsEnum, isNotEmpty, IsNotEmpty } from 'class-validator';
import { CarEntity } from '../../infrastructure/db/entities/car.entity';
import { UserEntity } from '../../infrastructure/db/entities/user.entity';
import { StateCar } from '../../domain/entities/request';

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

export class RequestsIdsDTO {
    @IsNotEmpty()
    idsRequest!: string[];
}
