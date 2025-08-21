import { Column, Entity, JoinColumn, ManyToOne, OneToOne, Timestamp } from "typeorm";
import { RequestEntity } from "./request.entity";
import { BaseEntity } from "../../config/base.entity";
import { UserDiscountEntity } from "./user-discount.entity";

export enum Automatic {
    YES = "yes",
    NO = "no"
}

@Entity({ name: "payment" })
export class PaymentEntity extends BaseEntity {

    @Column({ nullable: false })
    paidDate!: Date;

    @Column()
    createdDate!: Date;

    @Column({
        type: "enum",
        enum: Automatic,
        default: Automatic.YES,
        nullable: false,
        comment: "Whether the request is automatic or not"
    })
    automatic!: Automatic;

    @ManyToOne(() => RequestEntity, (request) => request.requestPayment, { nullable: false })
    @JoinColumn({ name: "request_id" })
    request_id!: RequestEntity;

    @OneToOne(() => UserDiscountEntity, (userDiscount) => userDiscount.payment, { nullable: true })
    userDiscount!: UserDiscountEntity | null;
}