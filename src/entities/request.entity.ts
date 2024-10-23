import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { BaseEntity } from "../config/base.entity";
import { UserEntity } from "./user.entity";
import { PaymentEntity } from "./payment.entity";
import { CarEntity } from "./car.entity";
import { DiscountEntity } from "./discount.entity";

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
    user_id!: UserEntity;

    @ManyToOne(() => CarEntity, (car) => car.requests)
    @JoinColumn({ name: "car_id" })
    car_id!: CarEntity;

    @OneToMany(() => PaymentEntity, (payment) => payment.request_id, { nullable: true })
    requestPayment!: PaymentEntity[];

    @OneToMany(() => DiscountEntity, (discount) => discount.request_id, { nullable: true })
    @JoinColumn({ name: "discount_id" })
    discount_id!: DiscountEntity;

}