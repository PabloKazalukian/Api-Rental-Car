import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { BaseEntity } from "../config/base.entity";
import { UserEntity } from "./user.entity";
import { PaymentEntity } from "./payment.entity";
import { CarEntity } from "./car.entity";

export enum StateCar {
    REQUEST = "req",
    CONFIRM = "con",
    CANCEL = "can"
}

@Entity({ name: "request" })
export class RequestEntity extends BaseEntity {

    @Column()
    initialDate!: Date;

    @Column()
    finalDate!: Date;


    @Column({
        type: "enum",
        enum: StateCar,
    })
    state!: StateCar;

    @ManyToOne(() => UserEntity, (user) => user.requests)
    @JoinColumn({ name: "user_id" })
    createBy!: UserEntity;

    @ManyToOne(() => CarEntity, (car) => car.requests)
    @JoinColumn({ name: "car_id" })
    requestedCar!: CarEntity;

    @OneToMany(() => PaymentEntity, (payment) => payment.paidRequest)
    requestPayment!: PaymentEntity[];
}