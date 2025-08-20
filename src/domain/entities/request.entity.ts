import {  Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { UserEntity } from "./user.entity";
import { PaymentEntity } from "./payment.entity";
import { CarEntity } from "./car.entity";
import { BaseEntity } from "../../infrastructure/config/base.entity";

export enum StateCar {
    REQUEST = "req",
    CONFIRM = "con",
    CANCEL = "can"
}

@Entity({ name: "request" })
export class RequestEntity extends BaseEntity {

    @Column()
    amount!: number;

    @Column()
    @Index()
    initialDate!: Date;

    @Column()
    @Index()
    finalDate!: Date;

    @Column({
        type: "enum",
        enum: StateCar,
    })
    state!: StateCar;

    @ManyToOne(() => UserEntity, (user) => user.requests)
    @JoinColumn({ name: "user_id" })
    user_id!: UserEntity;

    @ManyToOne(() => CarEntity, (car) => car.requests)
    @JoinColumn({ name: "car_id" })
    car_id!: CarEntity;

    @OneToMany(() => PaymentEntity, (payment) => payment.request_id, { nullable: true })
    requestPayment!: PaymentEntity[];

}