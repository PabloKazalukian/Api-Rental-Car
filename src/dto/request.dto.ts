import { BaseDTO } from "../config/base.dto";
import { IsEnum, IsNotEmpty } from "class-validator";
import { UserEntity } from "../entities/user.entity";
import { CarEntity } from "../entities/car.entity";

export enum StateCar {
    REQUEST = "req",
    CONFIRM = "con",
    CANCEL = "can"
}

export class RequestDTO extends BaseDTO {

    @IsNotEmpty()
    initialDate!: string;

    @IsNotEmpty()
    finalDate!: string;

    @IsNotEmpty()
    @IsEnum(StateCar)
    state!: StateCar;

    @IsNotEmpty()
    user_id!: UserEntity;

    @IsNotEmpty()
    car_id!: CarEntity;

    // @ManyToOne(() => UserEntity, (user) => user.requests)
    // @JoinColumn({ name: "user_id" })
    // createBy!: UserEntity;

    // @ManyToOne(() => CarEntity, (car) => car.requests)
    // @JoinColumn({ name: "car_id" })
    // requestedCar!: CarEntity;

    // @OneToMany(() => PaymentEntity, (payment) => payment.paidRequest)
    // requestPayment!: PaymentEntity[];

}