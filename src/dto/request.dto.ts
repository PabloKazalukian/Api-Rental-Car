import { BaseDTO } from "../config/base.dto";
import { IsEnum, IsNotEmpty } from "class-validator";

export enum StateCar {
    REQUEST = "req",
    CONFIRM = "con",
    CANCEL = "can"
}

export class RequestDTO extends BaseDTO {

    @IsNotEmpty()
    initial_date!: string;

    @IsNotEmpty()
    final_date!: string;

    @IsNotEmpty()
    @IsEnum(StateCar)
    state!: StateCar;

    @IsNotEmpty()
    user_id!: string;

    @IsNotEmpty()
    car_id!: string;

    // @ManyToOne(() => UserEntity, (user) => user.requests)
    // @JoinColumn({ name: "user_id" })
    // createBy!: UserEntity;

    // @ManyToOne(() => CarEntity, (car) => car.requests)
    // @JoinColumn({ name: "car_id" })
    // requestedCar!: CarEntity;

    // @OneToMany(() => PaymentEntity, (payment) => payment.paidRequest)
    // requestPayment!: PaymentEntity[];

}